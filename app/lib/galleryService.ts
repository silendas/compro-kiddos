import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export interface GalleryItem {
  id: string;
  title: string;
  img: string; // Base64 data URL atau URL gambar
  createdAt?: string | number | null;
}

const COLLECTION_NAME = "gallery";

/**
 * Mengambil seluruh foto galeri dari Firestore
 */
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      const fallbackSnap = await getDocs(collection(db, COLLECTION_NAME));
      if (!fallbackSnap.empty) {
        return fallbackSnap.docs.map((d) => ({
          id: d.id,
          title: d.data().title || "Kegiatan Belajar Siswa",
          img: d.data().img || "",
          createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
        }));
      }
      return [];
    }

    return snapshot.docs.map((d) => ({
      id: d.id,
      title: d.data().title || "Kegiatan Belajar Siswa",
      img: d.data().img || "",
      createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
    }));
  } catch (error) {
    console.warn("Gagal memuat galeri dari Firestore:", error);
    return [];
  }
}

/**
 * Menambahkan foto galeri baru ke Firestore
 */
export async function addGalleryItem(
  data: Omit<GalleryItem, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    title: data.title.trim(),
    img: data.img.trim(),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Menghapus foto galeri berdasarkan ID
 */
export async function deleteGalleryItem(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
