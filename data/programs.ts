import {
  course1,
  course2,
  course3,
  course4,
  course5,
  course6,
  course7,
  course8,
  course9,
  course10,
  course11,
} from "@asset/course";
import { StaticImageData } from "next/image";

export interface ProgramItem {
  id: string;
  title: string;
  desc: string;
  img: StaticImageData | string;
  featured?: boolean;
}

export const PROGRAM_LIST: ProgramItem[] = [
  {
    id: "pracalis",
    title: "PraCalis",
    desc: "Program interaktif untuk anak usia 3-4,5 tahun yang mendukung perkembangan motorik dan kognitif melalui permainan edukatif yang menyenangkan.",
    img: course1,
    featured: true,
  },
  {
    id: "calistung",
    title: "Calistung",
    desc: "Program yang mengasah kemampuan membaca, menulis, dan berhitung dengan metode menyenangkan bagi anak usia 4-7 tahun.",
    img: course2,
    featured: true,
  },
  {
    id: "mapel-sd",
    title: "Mapel SD",
    desc: "Menyajikan seluruh mata pelajaran untuk siswa SD dengan pendekatan praktis dan inovatif agar pembelajaran sekolah lebih mudah dipahami.",
    img: course3,
    featured: true,
  },
  {
    id: "matematika-sd-sma",
    title: "Mapel Matematika SD-SMA",
    desc: "Kursus matematika yang membangun pemahaman konsep secara mendalam, dari tingkat dasar hingga menantang, untuk mempersiapkan siswa menghadapi ujian.",
    img: course4,
    featured: true,
  },
  {
    id: "prisma-kalkulator-tangan",
    title: "Prisma Kalkulator Tangan TK & SD",
    desc: "Program khusus untuk melatih keterampilan berhitung cepat melalui metode kalkulator tangan yang interaktif bagi siswa TK dan SD.",
    img: course5,
    featured: true,
  },
  {
    id: "bahasa-inggris",
    title: "Bahasa Inggris TK-SMA",
    desc: "Kursus bahasa Inggris komprehensif yang mengutamakan interaksi aktif dan komunikasi percaya diri, cocok untuk semua jenjang TK hingga SMA.",
    img: course6,
    featured: true,
  },
  {
    id: "btq-al-quran",
    title: "BTQ Mengaji dan Hafalan Al-Quran",
    desc: "Program terstruktur untuk mengaji dan hafalan Al-Quran, menginspirasi kecintaan terhadap nilai-nilai agama dengan metode pembelajaran yang ramah anak.",
    img: course7,
  },
  {
    id: "les-komputer",
    title: "Les Komputer",
    desc: "Kursus komputer praktis yang membekali siswa dengan keterampilan teknologi dasar dan pengenalan literasi digital melalui metode aplikatif.",
    img: course8,
  },
  {
    id: "les-mewarnai",
    title: "Les Mewarnai",
    desc: "Program kreatif yang mengembangkan imajinasi serta keterampilan motorik halus anak melalui aktivitas mewarnai dan menggambar yang edukatif.",
    img: course9,
  },
  {
    id: "les-renang",
    title: "Les Renang TK-SD",
    desc: "Program renang aman dan menyenangkan untuk anak-anak TK hingga SD dengan pelatihan teknik dasar renang oleh instruktur berpengalaman.",
    img: course10,
  },
  {
    id: "bahasa-arab",
    title: "Les Bahasa Arab",
    desc: "Kursus intensif bahasa Arab interaktif, membantu siswa memahami kaidah tata bahasa dan kosakata dasar dengan mudah dicerna.",
    img: course11,
  },
];
