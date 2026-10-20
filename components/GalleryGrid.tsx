"use client";

import { useEffect, useState } from "react";
import { getGallery, GalleryItem } from "@lib/galleryService";
import { FaImages } from "react-icons/fa";

export default function GalleryGrid() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery()
      .then((data) => setGallery(data))
      .catch((err) => console.warn("Gagal memuat galeri:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm font-sans">Memuat foto kegiatan...</p>
      </div>
    );
  }

  if (gallery.length === 0) {
    return (
      <div className="bg-white border border-dashed border-amber-300 rounded-3xl p-10 text-center max-w-md mx-auto shadow-sm">
        <div className="w-16 h-16 bg-amber-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
          <FaImages />
        </div>
        <h3 className="text-lg font-bold text-gray-800 baloo">
          Dokumentasi Foto Sedang Diperbarui
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Foto-foto kegiatan seru belajar dan bermain anak di Bimbel Kiddos Zone akan segera diunggah.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {gallery.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300 relative aspect-[3/2] bg-gray-100 group"
        >
          <img
            src={item.img}
            alt={item.title || "Dokumentasi belajar Bimbel Kiddos Zone"}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
            decoding="async"
          />
          {item.title && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              {item.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
