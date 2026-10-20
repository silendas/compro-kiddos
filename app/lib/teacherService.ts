import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  img: string; // Base64 data URL atau URL gambar
  createdAt?: string | number | null;
}

const COLLECTION_NAME = "teachers";

/**
 * Mengambil daftar seluruh guru dari Firestore.
 * Mengembalikan array kosong jika belum ada guru yang diinputkan.
 */
export async function getTeachers(): Promise<Teacher[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Coba tanpa orderBy jika ada dokumen tanpa createdAt
      const fallbackSnap = await getDocs(collection(db, COLLECTION_NAME));
      if (!fallbackSnap.empty) {
        return fallbackSnap.docs.map((d) => ({
          id: d.id,
          name: d.data().name || "Nama Guru",
          subject: d.data().subject || "Pengajar",
          img: d.data().img || "",
          createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
        }));
      }
      return [];
    }

    return snapshot.docs.map((d) => ({
      id: d.id,
      name: d.data().name || "Nama Guru",
      subject: d.data().subject || "Pengajar",
      img: d.data().img || "",
      createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
    }));
  } catch (error) {
    console.warn("Gagal memuat data guru dari Firestore:", error);
    return [];
  }
}

/**
 * Menambahkan data guru baru ke Firestore.
 */
export async function addTeacher(
  data: Omit<Teacher, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    name: data.name.trim(),
    subject: data.subject.trim(),
    img: data.img.trim(),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Memperbarui data guru di Firestore.
 */
export async function updateTeacher(
  id: string,
  data: Partial<Omit<Teacher, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Menghapus data guru dari Firestore berdasarkan ID.
 */
export async function deleteTeacher(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
