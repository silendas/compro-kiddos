"use client";

import Image from "next/image";
import Link from "next/link";
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

const whatsappNumber = "6285156732275";
const whatsappMessage =
  "Halo, saya tertarik untuk mendaftar di Bimbel Kiddos Zone! Bisa dibantu?";

const programBelajar = [
  {
    title: "PraCalis",
    desc: "Program interaktif untuk anak usia 3-4,5 tahun yang mendukung perkembangan motorik dan kognitif melalui permainan edukatif.",
    img: course1,
  },
  {
    title: "Calistung",
    desc: "Dirancang untuk anak usia 4-7 tahun, program ini mengasah kemampuan membaca, menulis, dan berhitung dengan metode yang menyenangkan.",
    img: course2,
  },
  {
    title: "Mapel SD",
    desc: "Menyajikan berbagai mata pelajaran untuk siswa SD dengan pendekatan praktis dan inovatif agar pembelajaran sehari-hari lebih menarik.",
    img: course3,
  },
  {
    title: "Mapel Matematika SD-SMA",
    desc: "Kursus matematika yang membangun pemahaman konsep secara mendalam, dari tingkat dasar hingga menantang, untuk mempersiapkan siswa menghadapi ujian.",
    img: course4,
  },
  {
    title: "Prisma Kalkulator Tangan TK & SD",
    desc: "Program khusus untuk melatih keterampilan berhitung cepat melalui kalkulator tangan dengan pendekatan yang menyenangkan bagi TK dan SD.",
    img: course5,
  },
  {
    title: "Bahasa Inggris TK-SMA",
    desc: "Kursus bahasa Inggris komprehensif yang mengutamakan interaksi dan komunikasi, cocok untuk semua jenjang mulai dari TK hingga SMA.",
    img: course6,
  },
  {
    title: "BTQ Mengaji dan Hafalan Al-Quran",
    desc: "Program terstruktur untuk mengaji dan hafalan Al-Quran, menginspirasi kecintaan terhadap nilai-nilai agama dengan metode pembelajaran yang menyenangkan.",
    img: course7,
  },
  {
    title: "Les Komputer",
    desc: "Kursus komputer praktis yang membekali siswa dengan keterampilan teknologi dasar dan pengenalan pemrograman melalui metode yang mudah dipahami.",
    img: course8,
  },
  {
    title: "Les Mewarnai",
    desc: "Program kreatif yang mengembangkan imajinasi serta keterampilan motorik halus anak melalui aktivitas mewarnai yang seru dan edukatif.",
    img: course9,
  },
  {
    title: "Les Renang TK-SD",
    desc: "Program renang yang aman dan menyenangkan untuk anak-anak TK hingga SD, dengan pelatihan teknik dasar renang yang terstruktur.",
    img: course10,
  },
  {
    title: "Les Bahasa Arab",
    desc: "Kursus intensif bahasa Arab yang interaktif, membantu siswa memahami tata bahasa dan kosakata dengan metode yang menarik dan mudah dicerna.",
    img: course11,
  },
];

export default function ProgramLes() {
  return (
    <div className="max-w-5xl mx-auto p-4 min-h-[80vh] bg-gray-50">
      <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <Link href="/" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>Program Les</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-2 text-start">Program Les</h1>
      <p className="text-start text-base text-gray-700 mb-10">
        Tersedia berbagai macam program belajar dan les untuk mendukung
        perkembangan akademik dan keterampilan siswa.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {programBelajar.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.img}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
              <Link
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  whatsappMessage
                )}`}
                target="_blank"
                className="mt-4 flex justify-center bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300"
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
