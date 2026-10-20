import type { Metadata } from "next";
import Link from "next/link";
import ProgramsList from "@comp/ProgramsList";
import { SITE_CONFIG } from "@data/siteConfig";

export const metadata: Metadata = {
  title: "Program Les & Bimbingan Belajar di Bogor",
  description:
    "Daftar program bimbingan belajar terbaik di Bogor: PraCalis, Calistung, Matematika SD-SMA, Bahasa Inggris, Prisma Kalkulator Tangan, BTQ Al-Qur'an, dan kelas keterampilan.",
  alternates: {
    canonical: "/program-les",
  },
  openGraph: {
    title: "Program Les & Bimbingan Belajar di Bogor - Bimbel Kiddos Zone",
    description:
      "Tersedia berbagai pilihan program belajar interaktif untuk anak usia 3 tahun hingga jenjang SMA di Bogor.",
    url: "https://www.bimbelkiddoszone.com/program-les",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Program Bimbingan Belajar Bimbel Kiddos Zone Bogor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Program Les & Bimbingan Belajar di Bogor - Bimbel Kiddos Zone",
    description:
      "Tersedia berbagai pilihan program belajar interaktif untuk anak usia 3 tahun hingga jenjang SMA di Bogor.",
    images: ["/og-image.jpg"],
  },
};

export default function ProgramLesPage() {
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
        name: "Program Les Bogor",
        item: `${SITE_CONFIG.url}/program-les`,
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
            Program Les
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-start text-gray-800 baloo">
          Program Les & Bimbingan Belajar di Bogor
        </h1>
        <p className="text-start text-base md:text-lg text-gray-700">
          Tersedia berbagai macam program belajar dan les berkualitas untuk
          mendukung perkembangan akademik, kognitif, serta keterampilan minat bakat siswa.
        </p>
      </header>

      <ProgramsList />
    </div>
  );
}
