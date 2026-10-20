"use client";

import { useEffect, useState } from "react";
import { getGallery, GalleryItem } from "@lib/galleryService";

export default function HomeGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery()
      .then((data) => setGallery(data.slice(0, 4)))
      .catch((err) => console.warn("Gagal memuat galeri beranda:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-8 text-center text-amber-100">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2" />
      </div>
    );
  }

  if (gallery.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white max-w-md mx-auto mt-6">
        <p className="text-sm font-semibold">
          Dokumentasi foto kegiatan belajar akan segera diunggah.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      {gallery.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition duration-300 relative aspect-[3/2] bg-amber-200 group"
        >
          <img
            src={item.img}
            alt={item.title || "Kegiatan belajar siswa Bimbel Kiddos Zone"}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
            decoding="async"
          />
          {item.title && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {item.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
