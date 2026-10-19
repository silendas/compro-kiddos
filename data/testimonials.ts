export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number; // 1-5
  avatar?: string;
  avatarBg?: string; // background color for avatar initial
  program?: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "1",
    name: "Ibu Dini",
    role: "Orang Tua Siswa Kelas 2 SD",
    content:
      "“Anak saya jadi lebih fokus dan semangat belajar. Tutor-nya sabar dan cara menyampaikannya mudah dipahami. Nilainya juga meningkat!”",
    rating: 5,
    avatarBg: "from-pink-400 to-rose-400",
    program: "Bimbel Tematik SD",
  },
  {
    id: "2",
    name: "Bunda Alif",
    role: "Orang Tua Siswa TK B (Calistung)",
    content:
      "“Awalnya anak saya susah diajak belajar membaca. Setelah ikut program Calistung di Kiddos Zone, sekarang sebelum masuk SD sudah lancar membaca dan berhitung tanpa dipaksa. Belajarnya seru dan tidak membosankan!”",
    rating: 5,
    avatarBg: "from-teal-400 to-emerald-400",
    program: "PraCalis & Calistung",
  },
  {
    id: "3",
    name: "Pak Hendra",
    role: "Orang Tua Siswa Kelas 4 SD",
    content:
      "“Metode Prisma Kalkulator Tangan sangat membantu anak saya menghitung cepat. Nilai matematika di sekolah naik signifikan dan anak jadi jauh lebih percaya diri saat ujian.”",
    rating: 5,
    avatarBg: "from-amber-400 to-orange-400",
    program: "Prisma Kalkulator Tangan",
  },
  {
    id: "4",
    name: "Mama Keenan",
    role: "Orang Tua Siswa Kelas 1 SD",
    content:
      "“Pengajarnya ramah dan sangat komunikatif dengan orang tua. Setiap sesi ada laporan perkembangan ananda, jadi kami tahu persis apa saja yang sudah dikuasai anak di kelas.”",
    rating: 5,
    avatarBg: "from-purple-400 to-indigo-400",
    program: "Les Privat Calistung",
  },
  {
    id: "5",
    name: "Ibu Rina",
    role: "Orang Tua Siswa Kelas 3 SD",
    content:
      "“Alhamdulillah ananda sekarang makhraj huruf dan hafalan surat pendeknya semakin bagus berkat bimbingan guru BTQ di Kiddos Zone. Suasananya hangat dan anak selalu antusias berangkat les.”",
    rating: 5,
    avatarBg: "from-sky-400 to-blue-500",
    program: "BTQ & Mengaji",
  },
  {
    id: "6",
    name: "Bunda Zahra",
    role: "Orang Tua Siswa Kelas 6 SD",
    content:
      "“Persiapan ujian sekolah jadi lebih terarah dan tenang. Guru-gurunya membahas materi dan trik cepat soal-soal matematika dengan cara yang mudah dimengerti anak.”",
    rating: 5,
    avatarBg: "from-rose-400 to-pink-500",
    program: "Bimbel Intensif Ujian SD",
  },
];
