"use client";

import { useEffect, useState } from "react";
import { getPrograms, Program } from "@lib/programService";
import { SITE_CONFIG } from "@data/siteConfig";
import { FaBookOpen } from "react-icons/fa";

export default function ProgramsList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappMessage
  )}`;

  useEffect(() => {
    getPrograms()
      .then((data) => setPrograms(data))
      .catch((err) => console.warn("Gagal memuat program:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm font-sans">Memuat program bimbingan belajar...</p>
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="bg-white border border-dashed border-amber-300 rounded-3xl p-10 text-center max-w-md mx-auto shadow-sm">
        <div className="w-16 h-16 bg-amber-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">
          <FaBookOpen />
        </div>
        <h3 className="text-lg font-bold text-gray-800 baloo">
          Program Belajar Sedang Diperbarui
        </h3>
        <p className="text-sm text-gray-500 mt-1 font-sans">
          Daftar kurikulum dan program bimbingan belajar akan segera ditampilkan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {programs.map((item) => (
        <article
          key={item.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col border border-amber-100"
        >
          <div className="relative h-48 w-full bg-amber-50 flex items-center justify-center">
            {item.img ? (
              <img
                src={item.img}
                alt={`Program ${item.title} di Bimbel Kiddos Zone Bogor`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-orange-500">
                <FaBookOpen className="text-5xl" />
                <span className="text-xs font-bold mt-2 text-orange-700">Kiddos Zone</span>
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h2 className="text-xl font-bold text-gray-800 baloo">
              {item.title}
            </h2>
            <p className="mt-2 text-gray-600 text-sm flex-1 leading-relaxed font-sans">
              {item.desc}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex justify-center bg-orange-500 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition duration-300 shadow baloo"
              aria-label={`Daftar program ${item.title} via WhatsApp`}
            >
              Daftar Sekarang
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
