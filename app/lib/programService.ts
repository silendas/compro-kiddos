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

export interface Program {
  id: string;
  title: string;
  desc: string;
  img?: string; // Base64 data URL atau URL gambar
  featured?: boolean;
  createdAt?: string | number | null;
}

const COLLECTION_NAME = "programs";

let programCache: { data: Program[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 menit in-memory cache

export function invalidateProgramCache() {
  programCache = null;
}

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
 * Mengambil semua program belajar dari Firestore dengan in-memory cache
 */
export async function getPrograms(): Promise<Program[]> {
  const now = Date.now();
  if (programCache && now - programCache.timestamp < CACHE_TTL_MS) {
    return programCache.data;
  }

  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));
    if (snapshot.empty) {
      return [];
    }

    const items: Program[] = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "Program Les",
        desc: data.desc || "",
        img: data.img || "",
        featured: data.featured ?? true,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });

    // Urutkan berdasarkan createdAt desc
    items.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return String(b.createdAt).localeCompare(String(a.createdAt));
      }
      if (a.createdAt) return -1;
      if (b.createdAt) return 1;
      return 0;
    });

    programCache = { data: items, timestamp: now };
    return items;
  } catch (error) {
    console.warn("Gagal memuat program dari Firestore:", error);
    return programCache ? programCache.data : [];
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
  invalidateProgramCache();
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
  invalidateProgramCache();
}

/**
 * Menghapus program belajar
 */
export async function deleteProgram(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  invalidateProgramCache();
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
  invalidateProgramCache();
  return count;
}
