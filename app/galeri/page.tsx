import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@comp/GalleryGrid";

import { SITE_CONFIG } from "@data/siteConfig";

export const metadata: Metadata = {
  title: "Galeri Kegiatan Belajar Siswa",
  description:
    "Dokumentasi foto kegiatan belajar mengajar interaktif, kelas ceria, serta prestasi siswa di Bimbel Kiddos Zone Bogor.",
  alternates: {
    canonical: "/galeri",
  },
  openGraph: {
    title: "Galeri Kegiatan Belajar Siswa - Bimbel Kiddos Zone Bogor",
    description:
      "Lihat keseruan belajar, bermain edukatif, dan keceriaan para siswa di Bimbel Kiddos Zone Bogor.",
    url: "https://www.bimbelkiddoszone.com/galeri",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Galeri Siswa Bimbel Kiddos Zone Bogor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeri Kegiatan Belajar Siswa - Bimbel Kiddos Zone Bogor",
    description:
      "Lihat keseruan belajar, bermain edukatif, dan keceriaan para siswa di Bimbel Kiddos Zone Bogor.",
    images: ["/og-image.jpg"],
  },
};

export default function GalleryPage() {
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
        name: "Galeri Siswa",
        item: `${SITE_CONFIG.url}/galeri`,
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
            Galeri
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 baloo">
          Galeri Kegiatan Bimbel Kiddos Zone
        </h1>
        <p className="mt-2 text-gray-600">
          Suasana belajar interaktif dan keceriaan anak-anak selama bimbingan belajar berlangsung.
        </p>
      </header>

      <GalleryGrid />
    </div>
  );
}