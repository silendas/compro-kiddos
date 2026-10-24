"use client";

import { useEffect, useState } from "react";
import { getTeachers, Teacher } from "@lib/teacherService";
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaWhatsapp,
} from "react-icons/fa";
import { SITE_CONFIG } from "@data/siteConfig";

// Palet warna ceria tematik Kiddos Zone bergantian untuk tiap guru
const COLOR_THEMES = [
  {
    border: "border-orange-200/90 hover:border-orange-400 hover:shadow-orange-100/60",
    accentBar: "from-orange-400 via-amber-400 to-orange-400",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    badgeIcon: "text-orange-500",
    nameHover: "group-hover:text-orange-600",
    photoBg: "from-orange-100 via-amber-50 to-orange-50",
    waButton: "text-orange-700 bg-orange-50 hover:bg-orange-100",
  },
  {
    border: "border-sky-200/90 hover:border-sky-400 hover:shadow-sky-100/60",
    accentBar: "from-sky-400 via-blue-400 to-sky-400",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    badgeIcon: "text-sky-500",
    nameHover: "group-hover:text-sky-600",
    photoBg: "from-sky-100 via-blue-50 to-sky-50",
    waButton: "text-sky-700 bg-sky-50 hover:bg-sky-100",
  },
  {
    border: "border-emerald-200/90 hover:border-emerald-400 hover:shadow-emerald-100/60",
    accentBar: "from-emerald-400 via-teal-400 to-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeIcon: "text-emerald-500",
    nameHover: "group-hover:text-emerald-600",
    photoBg: "from-emerald-100 via-teal-50 to-emerald-50",
    waButton: "text-emerald-700 bg-emerald-50 hover:bg-emerald-100",
  },
  {
    border: "border-rose-200/90 hover:border-rose-400 hover:shadow-rose-100/60",
    accentBar: "from-rose-400 via-pink-400 to-rose-400",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    badgeIcon: "text-rose-500",
    nameHover: "group-hover:text-rose-600",
    photoBg: "from-rose-100 via-pink-50 to-rose-50",
    waButton: "text-rose-700 bg-rose-50 hover:bg-rose-100",
  },
  {
    border: "border-purple-200/90 hover:border-purple-400 hover:shadow-purple-100/60",
    accentBar: "from-purple-400 via-indigo-400 to-purple-400",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    badgeIcon: "text-purple-500",
    nameHover: "group-hover:text-purple-600",
    photoBg: "from-purple-100 via-indigo-50 to-purple-50",
    waButton: "text-purple-700 bg-purple-50 hover:bg-purple-100",
  },
  {
    border: "border-amber-200/90 hover:border-amber-400 hover:shadow-amber-100/60",
    accentBar: "from-amber-400 via-yellow-400 to-amber-400",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    badgeIcon: "text-amber-600",
    nameHover: "group-hover:text-amber-700",
    photoBg: "from-amber-100 via-yellow-50 to-amber-50",
    waButton: "text-amber-800 bg-amber-50 hover:bg-amber-100",
  },
];

export default function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then((data) => setTeachers(data))
      .catch((err) => console.warn("Gagal memuat guru:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-sans text-gray-600">
          Memuat jajaran tenaga pendidik Bimbel Kiddos Zone...
        </p>
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="bg-white/90 border border-dashed border-amber-300 rounded-3xl p-8 md:p-12 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-amber-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner">
          <FaChalkboardTeacher />
        </div>
        <h3 className="text-xl font-bold text-gray-800 baloo">
          Informasi Pengajar Sedang Diperbarui
        </h3>
        <p className="text-sm text-gray-600 mt-2 font-sans leading-relaxed">
          Daftar tenaga pendidik berpengalaman Bimbel Kiddos Zone akan segera
          ditampilkan secara lengkap.
        </p>
      </div>
    );
  }

  const getWaUrl = (teacherName: string) => {
    const text = `Halo Admin Kiddos Zone, saya ingin bertanya info jadwal les dengan tutor ${teacherName}. Bisa dibantu?`;
    return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full">
      {/* Grid Seluruh Guru dengan Warna Ceria Tematik Bergantian */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {teachers.map((teacher, index) => {
          const theme = COLOR_THEMES[index % COLOR_THEMES.length];

          return (
            <div
              key={teacher.id}
              className={`bg-white rounded-3xl overflow-hidden border-2 ${theme.border} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group select-none`}
            >
              {/* Foto Guru: Full width di bagian atas dengan object-cover object-top */}
              <div
                className={`relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br ${theme.photoBg}`}
              >
                {teacher.img ? (
                  <img
                    src={teacher.img}
                    alt={`Guru Bimbel Kiddos Zone - ${teacher.name}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FaChalkboardTeacher
                        className={`text-4xl ${theme.badgeIcon}`}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700 baloo">
                      Bimbel Kiddos Zone
                    </span>
                  </div>
                )}
              </div>

              {/* Garis Aksen Berwarna Sesuai Tema Guru */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${theme.accentBar}`} />

              {/* Detail Guru */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between text-center bg-white">
                <div>
                  <h3
                    className={`text-base sm:text-lg font-bold text-gray-800 baloo leading-snug ${theme.nameHover} transition-colors line-clamp-2 min-h-[2.75rem] flex items-center justify-center`}
                  >
                    {teacher.name}
                  </h3>

                  <div className="mt-2.5 flex justify-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${theme.badge} border shadow-2xs`}
                    >
                      <FaGraduationCap
                        className={`text-xs shrink-0 ${theme.badgeIcon}`}
                      />
                      <span>{teacher.subject}</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 flex justify-center">
                  <a
                    href={getWaUrl(teacher.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold ${theme.waButton} py-2 px-3 rounded-xl transition`}
                    title={`Tanyakan info tutor ${teacher.name} ke WhatsApp`}
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>Tanya Tutor</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
