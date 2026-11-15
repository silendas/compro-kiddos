import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface GalleryItem {
  id: string;
  title: string;
  img: string; // Base64 data URL atau URL gambar
  createdAt?: string | number | null;
}

const COLLECTION_NAME = "gallery";

let galleryCache: { data: GalleryItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 menit cache in-memory

export function invalidateGalleryCache() {
  galleryCache = null;
}

/**
 * Mengambil foto galeri dari Firestore dengan optimasi limit & cache
 */
export async function getGallery(limitCount?: number): Promise<GalleryItem[]> {
  const now = Date.now();
  if (galleryCache && now - galleryCache.timestamp < CACHE_TTL_MS) {
    return limitCount ? galleryCache.data.slice(0, limitCount) : galleryCache.data;
  }

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = limitCount
      ? query(colRef, orderBy("createdAt", "desc"), limit(limitCount))
      : query(colRef, orderBy("createdAt", "desc"));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      const fallbackQ = limitCount ? query(colRef, limit(limitCount)) : colRef;
      const fallbackSnap = await getDocs(fallbackQ);
      if (!fallbackSnap.empty) {
        const items = fallbackSnap.docs.map((d) => ({
          id: d.id,
          title: d.data().title || "Kegiatan Belajar Siswa",
          img: d.data().img || "",
          createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
        }));
        if (!limitCount) {
          galleryCache = { data: items, timestamp: now };
        }
        return items;
      }
      return [];
    }

    const items = snapshot.docs.map((d) => ({
      id: d.id,
      title: d.data().title || "Kegiatan Belajar Siswa",
      img: d.data().img || "",
      createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
    }));

    if (!limitCount) {
      galleryCache = { data: items, timestamp: now };
    }

    return items;
  } catch (error) {
    console.warn("Gagal memuat galeri dari Firestore:", error);
    return galleryCache ? (limitCount ? galleryCache.data.slice(0, limitCount) : galleryCache.data) : [];
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
  invalidateGalleryCache();
  return docRef.id;
}

/**
 * Menghapus foto galeri berdasarkan ID
 */
export async function deleteGalleryItem(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  invalidateGalleryCache();
}
