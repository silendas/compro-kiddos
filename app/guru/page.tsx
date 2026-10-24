import type { Metadata } from "next";
import Link from "next/link";
import { FaGraduationCap, FaWhatsapp, FaHome, FaHeart } from "react-icons/fa";
import TeachersList from "@comp/TeachersList";
import { SITE_CONFIG } from "@data/siteConfig";

export const metadata: Metadata = {
  title: "Profil Guru & Tenaga Pendidik - Bimbel Kiddos Zone Bogor",
  description:
    "Kenali jajaran guru dan tenaga pendidik berpengalaman di Bimbel Kiddos Zone Bogor. Tutor sabar, ramah, dan bersertifikasi untuk PraCalis, Calistung, SD, SMP, hingga les privat.",
  alternates: {
    canonical: "/guru",
  },
  openGraph: {
    title: "Profil Guru & Tenaga Pendidik - Bimbel Kiddos Zone Bogor",
    description:
      "Tutor ramah, sabar, dan berdedikasi tinggi mendampingi anak belajar dengan metode bermain sambil belajar yang menyenangkan.",
    url: `${SITE_CONFIG.url}/guru`,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Guru Bimbel Kiddos Zone Bogor",
      },
    ],
  },
};

export default function GuruPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guru & Pengajar",
        item: `${SITE_CONFIG.url}/guru`,
      },
    ],
  };

  const waConsultUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Halo Admin Bimbel Kiddos Zone, saya ingin berkonsultasi mengenai guru les dan program belajar yang cocok untuk anak saya."
  )}`;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-sans">
            <li>
              <Link
                href="/"
                className="hover:text-orange-600 transition flex items-center gap-1 font-medium"
              >
                <FaHome className="text-xs" />
                <span>Beranda</span>
              </Link>
            </li>
            <li>/</li>
            <li className="text-orange-600 font-bold">Guru &amp; Pengajar</li>
          </ol>
        </nav>

        {/* Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs md:text-sm font-bold border border-orange-200 mb-4 shadow-2xs">
            <FaGraduationCap className="text-orange-600 text-base" />
            <span>Tim Pendidik Profesional</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 baloo leading-tight">
            Tenaga Pengajar Berdedikasi <br className="hidden sm:inline" />
            <span className="text-orange-600">Bimbel Kiddos Zone</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-600 font-sans leading-relaxed">
            Guru-guru yang telaten, ramah, dan berpengalaman yang siap
            menciptakan suasana belajar yang aktif, nyaman, dan menyenangkan bagi
            setiap ananda.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-gray-600 font-sans">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs">
              <FaHeart className="text-rose-500 text-xs" /> Sabar &amp; Bersahabat
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Metode Interaktif
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-amber-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Kelas Tatap Muka &amp; Privat
            </span>
          </div>
        </div>

        {/* Teachers Directory Component */}
        <div className="mt-8">
          <TeachersList />
        </div>

        {/* WhatsApp Consultation Banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold baloo leading-tight">
              Ingin Konsultasi Memilih Guru / Program Les?
            </h2>
            <p className="text-white/95 text-sm sm:text-base mt-2 font-sans max-w-xl">
              Tim Kiddos Zone siap membantu mencocokkan karakter anak dengan tutor
              terbaik serta menjadwalkan sesi les di bimbel maupun privat ke rumah.
            </p>
          </div>

          <a
            href={waConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2.5 bg-white text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold px-6 py-3.5 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 baloo text-base"
          >
            <FaWhatsapp className="text-xl text-emerald-500" />
            <span>Konsultasi Gratis via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
