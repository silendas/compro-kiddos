"use client";

import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { getBranches, BranchItem } from "@lib/branchService";
import { SITE_CONFIG } from "@data/siteConfig";

export default function HomeBranches() {
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBranches()
      .then((data) => {
        if (data.length > 0) {
          setBranches(data);
        } else {
          // Fallback ke siteConfig jika belum ada data di Firestore
          setBranches(
            SITE_CONFIG.branches.map((b, i) => ({
              id: `fallback-${i}`,
              title: b.title,
              address: b.address,
              isHeadquarters: b.isHeadquarters,
              order: i + 1,
            }))
          );
        }
      })
      .catch((err) => {
        console.warn("Gagal memuat cabang dari database, menggunakan fallback:", err);
        setBranches(
          SITE_CONFIG.branches.map((b, i) => ({
            id: `fallback-${i}`,
            title: b.title,
            address: b.address,
            isHeadquarters: b.isHeadquarters,
            order: i + 1,
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-gray-500 text-sm font-sans">Memuat lokasi cabang...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 text-start text-gray-800 shadow-xl font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch, index) => (
          <div
            key={branch.id || index}
            className="p-5 rounded-xl border border-amber-100 bg-amber-50/30 hover:border-orange-400 hover:shadow-md transition duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                <h3 className="text-lg font-bold text-orange-700 baloo leading-snug">
                  {branch.title}
                </h3>
                {branch.isHeadquarters && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                    <FaStar className="text-amber-500" /> Pusat
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3 font-sans">
                {branch.address}
              </p>
            </div>

            {(branch.phone || branch.mapsUrl) && (
              <div className="pt-2 border-t border-amber-100 flex flex-wrap items-center gap-3 text-xs">
                {branch.phone && (
                  <a
                    href={`https://wa.me/${branch.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-700 font-semibold hover:underline"
                  >
                    <FaPhoneAlt className="text-orange-500 text-[10px]" /> {branch.phone}
                  </a>
                )}
                {branch.mapsUrl && (
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline"
                  >
                    <FaMapMarkerAlt className="text-red-500 text-[10px]" /> Petunjuk Arah <FaExternalLinkAlt className="text-[9px]" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
