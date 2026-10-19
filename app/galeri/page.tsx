import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GALLERY_LIST } from "@data/gallery";

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
  },
};

export default function GalleryPage() {
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY_LIST.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300 relative aspect-[3/2]"
          >
            <Image
              src={item.img}
              alt={`Dokumentasi belajar ${item.title} Bimbel Kiddos Zone Bogor`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}