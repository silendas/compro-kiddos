"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPrograms, Program } from "@lib/programService";
import { FaBookOpen } from "react-icons/fa";

export default function HomePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrograms()
      .then((data) => {
        // Tampilkan program yang ditandai featured, atau maksimal 6 program pertama
        const featuredList = data.filter((p) => p.featured);
        setPrograms(featuredList.length > 0 ? featuredList.slice(0, 6) : data.slice(0, 6));
      })
      .catch((err) => console.warn("Gagal memuat program beranda:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
      </div>
    );
  }

  if (programs.length === 0) {
    return (
      <div className="bg-white border border-dashed border-amber-200 rounded-2xl p-8 text-center max-w-md mx-auto shadow-sm">
        <p className="text-sm font-semibold text-gray-600">
          Program belajar sedang diperbarui oleh admin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
      {programs.map((program) => (
        <div
          key={program.id}
          className="bg-white border border-amber-100 hover:border-orange-300 rounded-2xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
        >
          <div>
            <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden bg-amber-50 flex items-center justify-center">
              {program.img ? (
                <img
                  src={program.img}
                  alt={`Program ${program.title} Bimbel Kiddos Zone Bogor`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-orange-400">
                  <FaBookOpen className="text-4xl" />
                  <span className="text-xs font-bold mt-1 text-orange-600">Kiddos Zone</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800 baloo">
              {program.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3 font-sans">
              {program.desc}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-50">
            <Link
              href="/program-les"
              className="inline-block text-orange-600 hover:text-orange-700 font-bold text-sm baloo"
            >
              Detail Program &amp; Pendaftaran &rarr;
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
