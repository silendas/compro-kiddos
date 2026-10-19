import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_CONFIG } from "@data/siteConfig";
import { PROGRAM_LIST } from "@data/programs";

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
  },
};

export default function ProgramLesPage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappMessage
  )}`;

  // Course schema for Google Rich Results
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PROGRAM_LIST.map((program, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Course",
        name: program.title,
        description: program.desc,
        provider: {
          "@type": "EducationalOrganization",
          name: SITE_CONFIG.name,
          sameAs: SITE_CONFIG.url,
        },
      },
    })),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 md:pt-10 pb-16 min-h-[80vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROGRAM_LIST.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.img}
                alt={`Program ${item.title} di Bimbel Kiddos Zone Bogor`}
                fill
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-800 baloo">
                {item.title}
              </h2>
              <p className="mt-2 text-gray-600 text-sm flex-1 leading-relaxed">
                {item.desc}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex justify-center bg-green-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-800 transition duration-300 shadow"
                aria-label={`Daftar program ${item.title} via WhatsApp`}
              >
                Daftar Sekarang
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
