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
  where,
  limit,
  Timestamp,
} from "firebase/firestore";

export interface Article {
  id: string;
  slug?: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
}

/**
 * Membuat SEO-friendly slug dari judul artikel
 * Contoh: "Tips Belajar Calistung di Bogor" -> "tips-belajar-calistung-di-bogor"
 */
export function createSlug(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Menghilangkan aksen/diakritik
    .replace(/[^\w\s-]/g, "") // Menghapus karakter khusus kecuali tanda hubung & spasi
    .replace(/[\s_-]+/g, "-") // Mengganti spasi atau underscore beruntun dengan single hyphen
    .replace(/^-+|-+$/g, ""); // Menghapus tanda hubung di awal atau akhir
}

/**
 * Mengubah Firestore Timestamp atau tanggal menjadi plain JavaScript object
 * tanpa prototype method / toJSON method agar serializable untuk Next.js Server & Client Components
 */
export function toPlainCreatedAt(raw: unknown): { seconds: number; nanoseconds: number } {
  if (!raw || typeof raw !== "object") {
    return { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };
  }

  const candidate = raw as {
    seconds?: unknown;
    nanoseconds?: unknown;
    toDate?: unknown;
  };

  if (typeof candidate.seconds === "number") {
    return {
      seconds: Math.floor(candidate.seconds),
      nanoseconds: typeof candidate.nanoseconds === "number" ? Math.floor(candidate.nanoseconds) : 0,
    };
  }

  if (typeof candidate.toDate === "function") {
    try {
      const date = (candidate.toDate as () => Date)();
      return {
        seconds: Math.floor(date.getTime() / 1000),
        nanoseconds: 0,
      };
    } catch {
      // fallback
    }
  }

  return { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };
}

/**
 * Menghasilkan objek Article yang 100% plain object (aman dilempar dari Server Component ke Client Component)
 */
export function sanitizeArticle(docId: string, data: Record<string, unknown>): Article {
  const title = typeof data.title === "string" ? data.title : "";
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim()
      : createSlug(title);
  const content = typeof data.content === "string" ? data.content : "";

  return {
    id: String(docId),
    slug,
    title,
    content,
    createdAt: toPlainCreatedAt(data.createdAt),
  };
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
      articles.push(sanitizeArticle(docSnap.id, docSnap.data() as Record<string, unknown>));
    });

    return articles;
  } catch (error) {
    console.error("Error mengambil artikel dari Firestore:", error);
    return [];
  }
}

/**
 * Mengambil 1 artikel berdasarkan ID atau Slug dari Firestore (Backward-Compatible)
 */
export async function getArticleById(idOrSlug: string): Promise<Article | null> {
  if (!idOrSlug) return null;

  const target = decodeURIComponent(idOrSlug).trim();

  try {
    // 1. Coba cari langsung berdasarkan Document ID Firestore
    const docRef = doc(db, "artikel", target);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return sanitizeArticle(docSnap.id, docSnap.data() as Record<string, unknown>);
    }

    // 2. Jika tidak ditemukan via Doc ID, cari berdasarkan field 'slug'
    const slugQuery = query(
      collection(db, "artikel"),
      where("slug", "==", target),
      limit(1)
    );
    const slugSnapshot = await getDocs(slugQuery);

    if (!slugSnapshot.empty) {
      const foundDoc = slugSnapshot.docs[0];
      return sanitizeArticle(foundDoc.id, foundDoc.data() as Record<string, unknown>);
    }

    // Coba juga slug dalam versi lowercase jika target ada huruf besar
    const lowerTarget = target.toLowerCase();
    if (lowerTarget !== target) {
      const lowerQuery = query(
        collection(db, "artikel"),
        where("slug", "==", lowerTarget),
        limit(1)
      );
      const lowerSnapshot = await getDocs(lowerQuery);
      if (!lowerSnapshot.empty) {
        const foundDoc = lowerSnapshot.docs[0];
        return sanitizeArticle(foundDoc.id, foundDoc.data() as Record<string, unknown>);
      }
    }

    // 3. Fallback: Ambil semua artikel untuk mencocokkan createSlug(title) jika slug belum tersimpan di Firestore
    const allArticles = await getArticles();
    const matched = allArticles.find(
      (a) =>
        a.slug === target ||
        a.id === target ||
        a.slug === lowerTarget ||
        createSlug(a.title) === target ||
        createSlug(a.title) === lowerTarget
    );

    return matched || null;
  } catch (error) {
    console.error(`Error mengambil artikel (${idOrSlug}) dari Firestore:`, error);
    return null;
  }
}

/**
 * Menambahkan artikel baru ke Firestore dengan SEO-friendly slug
 */
export async function addArticle(
  title: string,
  content: string,
  customSlug?: string
): Promise<string> {
  const autoSlug = customSlug?.trim() ? createSlug(customSlug) : createSlug(title);

  const newArticle = {
    title,
    slug: autoSlug,
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
 * Mengambil semua ID dan Slug artikel untuk generateStaticParams di Next.js static export
 */
export async function getAllArticleIds(): Promise<{ id: string }[]> {
  try {
    const snapshot = await getDocs(collection(db, "artikel"));
    const ids: { id: string }[] = [];

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      const slug = data.slug || createSlug(data.title || "");
      if (slug) {
        ids.push({ id: slug });
      }
      // Tetap sertakan Doc ID untuk backward-compatibility
      if (docSnap.id !== slug) {
        ids.push({ id: docSnap.id });
      }
    });

    return ids;
  } catch (error) {
    console.warn("Tidak dapat mengambil article IDs saat build time (mungkin offline):", error);
    return [];
  }
}
