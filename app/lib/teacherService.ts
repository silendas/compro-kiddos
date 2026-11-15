import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
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

let teacherCache: { data: Teacher[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 menit in-memory cache

export function invalidateTeacherCache() {
  teacherCache = null;
}

/**
 * Mengambil daftar seluruh guru dari Firestore dengan in-memory cache
 */
export async function getTeachers(): Promise<Teacher[]> {
  const now = Date.now();
  if (teacherCache && now - teacherCache.timestamp < CACHE_TTL_MS) {
    return teacherCache.data;
  }

  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (snapshot.empty) {
      return [];
    }

    const items: Teacher[] = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || "Nama Guru",
        subject: data.subject || "Pengajar",
        img: data.img || "",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });

    items.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return String(b.createdAt).localeCompare(String(a.createdAt));
      }
      if (a.createdAt) return -1;
      if (b.createdAt) return 1;
      return 0;
    });

    teacherCache = { data: items, timestamp: now };
    return items;
  } catch (error) {
    console.warn("Gagal memuat data guru dari Firestore:", error);
    return teacherCache ? teacherCache.data : [];
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
  invalidateTeacherCache();
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
  invalidateTeacherCache();
}

/**
 * Menghapus data guru dari Firestore berdasarkan ID.
 */
export async function deleteTeacher(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  invalidateTeacherCache();
}
