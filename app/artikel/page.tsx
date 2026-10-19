import type { Metadata } from "next";
import Link from "next/link";
import ArtikelList from "@comp/ArtikelList";

export const metadata: Metadata = {
  title: "Artikel & Tips Edukasi Anak",
  description:
    "Kumpulan artikel edukatif, kiat belajar calistung, tips parenting, dan informasi dunia pendidikan anak dari Bimbel Kiddos Zone Bogor.",
  alternates: {
    canonical: "/artikel",
  },
  openGraph: {
    title: "Artikel & Tips Edukasi Anak - Bimbel Kiddos Zone Bogor",
    description:
      "Dapatkan tips belajar efektif dan informasi seputar perkembangan anak dari para pendidik Bimbel Kiddos Zone.",
    url: "https://www.bimbelkiddoszone.com/artikel",
    type: "website",
  },
};

export default function ArtikelPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 md:pt-10 pb-16 min-h-[80vh] bg-white">
      <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="text-green-700 hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-semibold" aria-current="page">
            Artikel
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 baloo">
          Artikel & Tips Belajar
        </h1>
        <p className="mt-2 text-gray-600">
          Wawasan, tips mendampingi anak belajar, dan informasi edukatif terkini.
        </p>
      </header>

      <ArtikelList />
    </div>
  );
}
