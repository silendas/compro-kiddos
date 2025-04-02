"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";
import logo from "@asset/Logo_Kiddos.png";
import { guru1, guru2, guru3, guru4, guru5, guru6 } from "@asset/teacher";
import "@style/globals.css";

const pengajar = [
  { name: "Ibu Frida", subject: "Guru PraCalis & Calistung", img: guru1 },
  { name: "Ms Deti", subject: "Guru Bahasa Inggris", img: guru2 },
  { name: "Ibu Hana", subject: "Guru BTQ dan Mapel Matematika", img: guru3 },
  { name: "Ms Dhifa", subject: "Guru Bahasa Inggris", img: guru4 },
  { name: "Ms Rara", subject: "Guru Prisma Kalkulator Tangan", img: guru5 },
  { name: "Ibu Dewi", subject: "Guru Calistung dan Prisma", img: guru6 },
];

export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto p-4 min-h-[80vh]">
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
          <li>Tentang Kami</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-start">Tentang Kami</h1>

      <section id="tentang-kami" className="py-12 px-6 text-black">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex justify-center">
            <div className="relative w-52 h-52 md:w-[350px] md:h-[350px] p-2 bg-transparent rounded-full transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,223,0,0.8)]">
              <Image
                src={logo}
                alt="Bimbel Kiddos Zone"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl mt-2 font-black text-green-700 baloo">
              Bimbel KIDDOS ZONE
            </h2>
            <p className="mt-3 text-lg md:text-xl leading-relaxed">
              Bimbel Kiddos Zone adalah lembaga pendidikan yang berkomitmen
              menyediakan program bimbingan belajar berkualitas untuk
              meningkatkan prestasi akademik serta keterampilan bahasa siswa.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed">
              Kami menghadirkan program yang dirancang khusus agar setiap siswa
              dapat belajar secara efektif dan mencapai potensi terbaiknya.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed">
              Dengan tenaga pengajar profesional dan metode pembelajaran
              inovatif, kami menciptakan lingkungan belajar yang interaktif,
              nyaman, dan mendukung perkembangan siswa secara optimal.
            </p>
          </div>
        </div>
      </section>

      <section id="informasi-pengajar" className="mt-5 px-5 py-8 bg-gray-100 md:bg-transparent rounded-lg">
        <div className="flex flex-col items-center mb-2">
          <div className="rounded-full bg-green-700 w-16 h-16 flex items-center justify-center mb-2">
            <FaGraduationCap size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-center text-green-700 baloo">
            Tenaga Pendidik
          </h2>
        </div>
        <p className="text-center text-lg text-gray-900 mb-8">
          Pengajar-pengajar terbaik yang akan mendampingi belajar siswa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pengajar.map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={teacher.img}
                  alt={teacher.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white md:bg-gray-200 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {teacher.name}
                </h3>
                <p className="text-gray-600">{teacher.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
