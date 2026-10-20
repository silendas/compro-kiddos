import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGraduationCap } from "react-icons/fa";
import logo from "@asset/Logo_Kiddos.webp";
import TeachersList from "@comp/TeachersList";

import { SITE_CONFIG } from "@data/siteConfig";

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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Profil Bimbel Kiddos Zone Bogor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Kami - Bimbel Kiddos Zone Bogor",
    description:
      "Kenali Bimbel Kiddos Zone lebih dekat: metode belajar interaktif dan tenaga pengajar profesional di Bogor.",
    images: ["/og-image.jpg"],
  },
};

export default function AboutUsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tentang Kami",
        item: `${SITE_CONFIG.url}/tentang-kami`,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 md:pt-10 pb-16 min-h-[80vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="mb-4 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <Link href="/" className="text-orange-600 hover:underline">
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
            <h2 className="text-2xl md:text-3xl mt-2 font-black text-orange-600 baloo">
              Bimbel KIDDOS ZONE
            </h2>
            <p className="mt-3 text-lg md:text-xl leading-relaxed text-gray-700 font-sans">
              Bimbel Kiddos Zone adalah lembaga pendidikan terpercaya di Bogor yang
              berkomitmen menyediakan program bimbingan belajar berkualitas untuk
              meningkatkan prestasi akademik serta keterampilan bahasa dan karakter siswa.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-700 font-sans">
              Kami menghadirkan program yang dirancang khusus dengan metode interaktif,
              kreatif, dan menyenangkan agar setiap anak dapat belajar secara efektif
              dan mencapai potensi terbaiknya dengan rasa percaya diri.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-700 font-sans">
              Dengan tenaga pengajar profesional, bersahabat, dan kurikulum yang
              inovatif, kami menciptakan lingkungan belajar yang nyaman, aman,
              dan mendukung perkembangan anak secara optimal.
            </p>
          </div>
        </div>
      </section>

      <section
        id="informasi-pengajar"
        className="mt-5 px-5 py-8 bg-amber-50/40 md:bg-transparent rounded-3xl"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="rounded-full bg-orange-500 w-16 h-16 flex items-center justify-center mb-2 shadow-md">
            <FaGraduationCap size={40} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 baloo">
            Tenaga Pendidik Berpengalaman
          </h2>
        </div>
        <p className="text-center text-lg text-gray-800 mb-8 font-sans">
          Pengajar-pengajar terbaik dan berdedikasi yang mendampingi proses belajar siswa
        </p>
        <TeachersList />
      </section>
    </div>
  );
}
