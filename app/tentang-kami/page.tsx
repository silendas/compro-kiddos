import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";
import logo from "@asset/Logo_Kiddos.png";
import { TEACHER_LIST } from "@data/teachers";

export const metadata: Metadata = {
  title: "Tentang Kami - Profil & Tenaga Pendidik",
  description:
    "Profil lengkap Bimbel Kiddos Zone Bogor, visi misi lembaga, serta jajaran guru dan tenaga pendidik berpengalaman untuk PraCalis, Calistung, SD, SMP, hingga SMA.",
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: "Tentang Kami - Bimbel Kiddos Zone Bogor",
    description:
      "Kenali Bimbel Kiddos Zone lebih dekat: metode belajar interaktif dan tenaga pengajar profesional di Bogor.",
    url: "https://www.bimbelkiddoszone.com/tentang-kami",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 md:pt-10 pb-16 min-h-[80vh]">
      <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <Link href="/" className="text-green-700 hover:underline">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-800 font-semibold" aria-current="page">
            Tentang Kami
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-start text-gray-800 baloo">
        Tentang Bimbel KIDDOS ZONE Bogor
      </h1>

      <section id="tentang-kami" className="py-8 md:py-12 px-2 md:px-6 text-black">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex justify-center">
            <div className="relative w-52 h-52 md:w-[350px] md:h-[350px] p-2 bg-transparent rounded-full transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,223,0,0.8)]">
              <Image
                src={logo}
                alt="Logo Resmi Bimbel Kiddos Zone Bogor"
                fill
                priority
                className="rounded-full object-cover"
                sizes="(max-width: 768px) 208px, 350px"
              />
            </div>
          </div>
          <div className="text-left flex-1">
            <h2 className="text-2xl md:text-3xl mt-2 font-black text-green-700 baloo">
              Bimbel KIDDOS ZONE
            </h2>
            <p className="mt-3 text-lg md:text-xl leading-relaxed text-gray-700">
              Bimbel Kiddos Zone adalah lembaga pendidikan terpercaya di Bogor yang
              berkomitmen menyediakan program bimbingan belajar berkualitas untuk
              meningkatkan prestasi akademik serta keterampilan bahasa dan karakter siswa.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-700">
              Kami menghadirkan program yang dirancang khusus dengan metode interaktif,
              kreatif, dan menyenangkan agar setiap anak dapat belajar secara efektif
              dan mencapai potensi terbaiknya dengan rasa percaya diri.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-700">
              Dengan tenaga pengajar profesional, bersahabat, dan kurikulum yang
              inovatif, kami menciptakan lingkungan belajar yang nyaman, aman,
              dan mendukung perkembangan anak secara optimal.
            </p>
          </div>
        </div>
      </section>

      <section
        id="informasi-pengajar"
        className="mt-5 px-5 py-8 bg-gray-100 md:bg-transparent rounded-lg"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="rounded-full bg-green-700 w-16 h-16 flex items-center justify-center mb-2">
            <FaGraduationCap size={40} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 baloo">
            Tenaga Pendidik Berpengalaman
          </h2>
        </div>
        <p className="text-center text-lg text-gray-900 mb-8">
          Pengajar-pengajar terbaik dan berdedikasi yang mendampingi proses belajar siswa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEACHER_LIST.map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={teacher.img}
                  alt={`Guru Bimbel Kiddos Zone - ${teacher.name}`}
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4 bg-white md:bg-gray-100 text-center flex-1">
                <h3 className="text-xl font-semibold text-gray-800 baloo">
                  {teacher.name}
                </h3>
                <p className="text-gray-600 mt-1">{teacher.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
