"use client";

import Link from "next/link";
import Image from "next/image";
import { galeri1, galeri2, galeri3, galeri4, galeri5, galeri6, galeri7, galeri8, galeri9, galeri10, galeri11, galeri12, galeri13, galeri14, galeri15 } from "@asset/galery";

const galleryImages = [
  galeri1, galeri2, galeri3, galeri4, galeri5,
  galeri6, galeri7, galeri8, galeri9, galeri10, galeri11, galeri12, galeri13, galeri14, galeri15
];

export default function GalleryPage() {
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
          <li>Galeri</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Galeri Kegiatan Kami</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <Image
              src={image}
              alt={`Galeri ${index + 1}`}
              width={300}
              height={200}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}