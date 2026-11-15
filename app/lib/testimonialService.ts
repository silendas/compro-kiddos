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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number; // 1-5
  avatar?: string;
  avatarBg?: string; // background color for avatar initial
  program?: string;
  createdAt?: string | number | null;
}

const COLLECTION_NAME = "testimonials";

let testimonialCache: { data: Testimonial[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 2 * 60 * 1000;

export function invalidateTestimonialCache() {
  testimonialCache = null;
}

// Data bawaan untuk fallback tampilan jika database belum diisi
const DEFAULT_TESTIMONIALS_SEED: Omit<Testimonial, "id" | "createdAt">[] = [
  {
    name: "Ibu Dini",
    role: "Orang Tua Siswa Kelas 2 SD",
    content: "“Anak saya jadi lebih fokus dan semangat belajar. Tutor-nya sabar dan cara menyampaikannya mudah dipahami. Nilainya juga meningkat!”",
    rating: 5,
    avatarBg: "from-pink-400 to-rose-400",
    program: "Bimbel Tematik SD",
  },
  {
    name: "Bunda Alif",
    role: "Orang Tua Siswa TK B (Calistung)",
    content: "“Awalnya anak saya susah diajak belajar membaca. Setelah ikut program Calistung di Kiddos Zone, sekarang sebelum masuk SD sudah lancar membaca dan berhitung tanpa dipaksa. Belajarnya seru dan tidak membosankan!”",
    rating: 5,
    avatarBg: "from-teal-400 to-emerald-400",
    program: "PraCalis & Calistung",
  },
  {
    name: "Pak Hendra",
    role: "Orang Tua Siswa Kelas 4 SD",
    content: "“Metode Prisma Kalkulator Tangan sangat membantu anak saya menghitung cepat. Nilai matematika di sekolah naik signifikan dan anak jadi jauh lebih percaya diri saat ujian.”",
    rating: 5,
    avatarBg: "from-amber-400 to-orange-400",
    program: "Prisma Kalkulator Tangan",
  },
  {
    name: "Mama Keenan",
    role: "Orang Tua Siswa Kelas 1 SD",
    content: "“Pengajarnya ramah dan sangat komunikatif dengan orang tua. Setiap sesi ada laporan perkembangan ananda, jadi kami tahu persis apa saja yang sudah dikuasai anak di kelas.”",
    rating: 5,
    avatarBg: "from-purple-400 to-indigo-400",
    program: "Les Privat Calistung",
  },
  {
    name: "Ibu Rina",
    role: "Orang Tua Siswa Kelas 3 SD",
    content: "“Alhamdulillah ananda sekarang makhraj huruf dan hafalan surat pendeknya semakin bagus berkat bimbingan guru BTQ di Kiddos Zone. Suasananya hangat dan anak selalu antusias berangkat les.”",
    rating: 5,
    avatarBg: "from-sky-400 to-blue-500",
    program: "BTQ & Mengaji",
  },
  {
    name: "Bunda Zahra",
    role: "Orang Tua Siswa Kelas 6 SD",
    content: "“Persiapan ujian sekolah jadi lebih terarah dan tenang. Guru-gurunya membahas materi dan trik cepat soal-soal matematika dengan cara yang mudah dimengerti anak.”",
    rating: 5,
    avatarBg: "from-rose-400 to-pink-500",
    program: "Bimbel Intensif Ujian SD",
  },
];

/**
 * Mengambil review dari Firestore dengan in-memory cache dan fallback
 */
export async function getTestimonials(allowFallback: boolean = true): Promise<Testimonial[]> {
  const now = Date.now();
  if (testimonialCache && now - testimonialCache.timestamp < CACHE_TTL_MS) {
    if (testimonialCache.data.length > 0) return testimonialCache.data;
    if (allowFallback) {
      return DEFAULT_TESTIMONIALS_SEED.map((item, idx) => ({ ...item, id: String(idx + 1) }));
    }
    return [];
  }

  try {
    const snapshot = await getDocs(collection(db, COLLECTION_NAME));

    if (snapshot.empty) {
      const fallbackData = allowFallback
        ? DEFAULT_TESTIMONIALS_SEED.map((item, idx) => ({ ...item, id: String(idx + 1) }))
        : [];
      return fallbackData;
    }

    const items: Testimonial[] = snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || "Orang Tua Siswa",
        role: data.role || "Orang Tua Siswa",
        content: data.content || "",
        rating: Number(data.rating) || 5,
        program: data.program || "",
        avatar: data.avatar || "",
        avatarBg: data.avatarBg || "from-pink-400 to-rose-400",
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

    testimonialCache = { data: items, timestamp: now };
    return items;
  } catch (error) {
    console.warn("Firestore testimonials offline/unavailable:", error);
    if (allowFallback) {
      return DEFAULT_TESTIMONIALS_SEED.map((item, idx) => ({ ...item, id: String(idx + 1) }))
    }
    return [];
  }
}

/**
 * Menambah review baru ke Firestore.
 */
export async function addTestimonial(
  data: Omit<Testimonial, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    name: data.name.trim(),
    role: data.role.trim(),
    content: data.content.trim(),
    rating: Number(data.rating) || 5,
    program: data.program?.trim() || "",
    avatarBg: data.avatarBg || "from-pink-400 to-rose-400",
    avatar: data.avatar || "",
    createdAt: serverTimestamp(),
  });
  invalidateTestimonialCache();
  return docRef.id;
}

/**
 * Memperbarui review di Firestore.
 */
export async function updateTestimonial(
  id: string,
  data: Partial<Omit<Testimonial, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
  invalidateTestimonialCache();
}

/**
 * Menghapus review dari Firestore.
 */
export async function deleteTestimonial(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  invalidateTestimonialCache();
}

/**
 * Menyalin data contoh default ke Firestore melalui admin panel.
 */
export async function seedInitialTestimonials(): Promise<number> {
  let count = 0;
  for (const item of DEFAULT_TESTIMONIALS_SEED) {
    await addDoc(collection(db, COLLECTION_NAME), {
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating,
      program: item.program || "",
      avatarBg: item.avatarBg || "from-pink-400 to-rose-400",
      createdAt: serverTimestamp(),
    });
    count++;
  }
  invalidateTestimonialCache();
  return count;
}
