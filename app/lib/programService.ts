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

export interface Program {
  id: string;
  title: string;
  desc: string;
  img?: string; // Base64 data URL atau URL gambar
  featured?: boolean;
  createdAt?: string | number | null;
}

const COLLECTION_NAME = "programs";

// Program bawaan standar jika admin ingin menyalin kurikulum awal
const DEFAULT_PROGRAMS: Omit<Program, "id" | "createdAt">[] = [
  {
    title: "PraCalis",
    desc: "Program interaktif untuk anak usia 3-4,5 tahun yang mendukung perkembangan motorik dan kognitif melalui permainan edukatif yang menyenangkan.",
    featured: true,
  },
  {
    title: "Calistung",
    desc: "Program yang mengasah kemampuan membaca, menulis, dan berhitung dengan metode menyenangkan bagi anak usia 4-7 tahun.",
    featured: true,
  },
  {
    title: "Mapel SD",
    desc: "Menyajikan seluruh mata pelajaran untuk siswa SD dengan pendekatan praktis dan inovatif agar pembelajaran sekolah lebih mudah dipahami.",
    featured: true,
  },
  {
    title: "Mapel Matematika SD-SMA",
    desc: "Kursus matematika yang membangun pemahaman konsep secara mendalam, dari tingkat dasar hingga menantang, untuk mempersiapkan siswa menghadapi ujian.",
    featured: true,
  },
  {
    title: "Prisma Kalkulator Tangan TK & SD",
    desc: "Program khusus untuk melatih keterampilan berhitung cepat melalui metode kalkulator tangan yang interaktif bagi siswa TK dan SD.",
    featured: true,
  },
  {
    title: "BTQ & Mengaji",
    desc: "Bimbingan baca tulis Al-Qur'an, tajwid, serta hafalan surat pendek dengan metode bimbingan personal yang ramah anak.",
    featured: true,
  },
];

/**
 * Mengambil semua program belajar dari Firestore
 */
export async function getPrograms(): Promise<Program[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      const fallbackSnap = await getDocs(collection(db, COLLECTION_NAME));
      if (!fallbackSnap.empty) {
        return fallbackSnap.docs.map((d) => ({
          id: d.id,
          title: d.data().title || "Program Les",
          desc: d.data().desc || "",
          img: d.data().img || "",
          featured: d.data().featured ?? true,
          createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
        }));
      }
      return [];
    }

    return snapshot.docs.map((d) => ({
      id: d.id,
      title: d.data().title || "Program Les",
      desc: d.data().desc || "",
      img: d.data().img || "",
      featured: d.data().featured ?? true,
      createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
    }));
  } catch (error) {
    console.warn("Gagal memuat program dari Firestore:", error);
    return [];
  }
}

/**
 * Menambah program belajar baru
 */
export async function addProgram(
  data: Omit<Program, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    title: data.title.trim(),
    desc: data.desc.trim(),
    img: data.img?.trim() || "",
    featured: Boolean(data.featured),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Memperbarui program belajar
 */
export async function updateProgram(
  id: string,
  data: Partial<Omit<Program, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Menghapus program belajar
 */
export async function deleteProgram(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Menyalin data program bawaan awal ke Firestore
 */
export async function seedInitialPrograms(): Promise<number> {
  let count = 0;
  for (const item of DEFAULT_PROGRAMS) {
    await addDoc(collection(db, COLLECTION_NAME), {
      title: item.title,
      desc: item.desc,
      img: "",
      featured: item.featured ?? true,
      createdAt: serverTimestamp(),
    });
    count++;
  }
  return count;
}
