import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
  limit,
  Timestamp,
} from "firebase/firestore";

export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
}

/**
 * Mengambil daftar artikel dari Firestore
 */
export async function getArticles(limitCount?: number): Promise<Article[]> {
  try {
    const artikelRef = collection(db, "artikel");
    const q = limitCount
      ? query(artikelRef, orderBy("createdAt", "desc"), limit(limitCount))
      : query(artikelRef, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      articles.push({
        id: docSnap.id,
        title: data.title || "",
        content: data.content || "",
        createdAt: data.createdAt || { seconds: Date.now() / 1000, nanoseconds: 0 },
      });
    });

    return articles;
  } catch (error) {
    console.error("Error mengambil artikel dari Firestore:", error);
    return [];
  }
}

/**
 * Mengambil 1 artikel berdasarkan ID dari Firestore
 */
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const docRef = doc(db, "artikel", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      title: data.title || "",
      content: data.content || "",
      createdAt: data.createdAt || { seconds: Date.now() / 1000, nanoseconds: 0 },
    };
  } catch (error) {
    console.error(`Error mengambil artikel ID ${id} dari Firestore:`, error);
    return null;
  }
}

/**
 * Menambahkan artikel baru ke Firestore
 */
export async function addArticle(title: string, content: string): Promise<string> {
  const newArticle = {
    title,
    content,
    createdAt: Timestamp.fromDate(new Date()),
  };
  const docRef = await addDoc(collection(db, "artikel"), newArticle);
  return docRef.id;
}

/**
 * Menghapus artikel berdasarkan ID dari Firestore
 */
export async function deleteArticle(id: string): Promise<void> {
  await deleteDoc(doc(db, "artikel", id));
}

/**
 * Mengambil semua ID artikel untuk generateStaticParams di Next.js static export
 */
export async function getAllArticleIds(): Promise<{ id: string }[]> {
  try {
    const snapshot = await getDocs(collection(db, "artikel"));
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id }));
  } catch (error) {
    console.warn("Tidak dapat mengambil article IDs saat build time (mungkin offline):", error);
    return [];
  }
}
