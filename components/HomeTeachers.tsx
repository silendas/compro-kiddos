"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { getTeachers, Teacher } from "@lib/teacherService";
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Palet warna ceria tematik Kiddos Zone bergantian untuk tiap guru
const COLOR_THEMES = [
  {
    border: "border-orange-200/90 hover:border-orange-400 hover:shadow-orange-100/60",
    accentBar: "from-orange-400 via-amber-400 to-orange-400",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
    badgeIcon: "text-orange-500",
    nameHover: "group-hover:text-orange-600",
    photoBg: "from-orange-100 via-amber-50 to-orange-50",
  },
  {
    border: "border-sky-200/90 hover:border-sky-400 hover:shadow-sky-100/60",
    accentBar: "from-sky-400 via-blue-400 to-sky-400",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    badgeIcon: "text-sky-500",
    nameHover: "group-hover:text-sky-600",
    photoBg: "from-sky-100 via-blue-50 to-sky-50",
  },
  {
    border: "border-emerald-200/90 hover:border-emerald-400 hover:shadow-emerald-100/60",
    accentBar: "from-emerald-400 via-teal-400 to-emerald-400",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeIcon: "text-emerald-500",
    nameHover: "group-hover:text-emerald-600",
    photoBg: "from-emerald-100 via-teal-50 to-emerald-50",
  },
  {
    border: "border-rose-200/90 hover:border-rose-400 hover:shadow-rose-100/60",
    accentBar: "from-rose-400 via-pink-400 to-rose-400",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    badgeIcon: "text-rose-500",
    nameHover: "group-hover:text-rose-600",
    photoBg: "from-rose-100 via-pink-50 to-rose-50",
  },
  {
    border: "border-purple-200/90 hover:border-purple-400 hover:shadow-purple-100/60",
    accentBar: "from-purple-400 via-indigo-400 to-purple-400",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    badgeIcon: "text-purple-500",
    nameHover: "group-hover:text-purple-600",
    photoBg: "from-purple-100 via-indigo-50 to-purple-50",
  },
  {
    border: "border-amber-200/90 hover:border-amber-400 hover:shadow-amber-100/60",
    accentBar: "from-amber-400 via-yellow-400 to-amber-400",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    badgeIcon: "text-amber-600",
    nameHover: "group-hover:text-amber-700",
    photoBg: "from-amber-100 via-yellow-50 to-amber-50",
  },
];

export default function HomeTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    getTeachers()
      .then((data) => setTeachers(data))
      .catch((err) => console.warn("Gagal memuat guru:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-sans text-gray-600">
          Memuat profil guru berdedikasi Kiddos Zone...
        </p>
      </div>
    );
  }

  // Jika belum ada data guru yang diinput di kelola admin
  if (teachers.length === 0) {
    return (
      <div className="bg-amber-50/70 border border-dashed border-amber-300 rounded-3xl p-8 md:p-10 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-amber-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner">
          <FaChalkboardTeacher />
        </div>
        <h3 className="text-xl font-bold text-gray-800 baloo">
          Informasi Pengajar Sedang Diperbarui
        </h3>
        <p className="text-sm text-gray-600 mt-2 font-sans leading-relaxed">
          Daftar tenaga pendidik profesional Bimbel Kiddos Zone akan segera
          ditampilkan.
        </p>
      </div>
    );
  }

  const isSlider = teachers.length > 3;

  return (
    <div className="relative w-full">
      {/* Tombol navigasi slider jika jumlah guru > 3 */}
      {isSlider && (
        <div className="flex justify-end items-center mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Guru sebelumnya"
              className="w-9 h-9 rounded-full bg-white hover:bg-orange-500 text-orange-600 hover:text-white border border-amber-200 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Guru selanjutnya"
              className="w-9 h-9 rounded-full bg-white hover:bg-orange-500 text-orange-600 hover:text-white border border-amber-200 shadow-sm flex items-center justify-center transition-all duration-200 active:scale-95"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}

      {/* Slider Mode (Jika guru > 3) */}
      {isSlider ? (
        <div className="w-full pb-4">
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={20}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.15,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="teacher-swiper w-full !pb-12"
          >
            {teachers.map((teacher, index) => (
              <SwiperSlide key={teacher.id} className="h-auto">
                <TeacherCard teacher={teacher} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        /* Grid Mode (Jika guru <= 3) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.id} teacher={teacher} index={index} />
          ))}
        </div>
      )}

      {/* Tombol CTA "Lihat Semua Profil Guru" jika lebih dari 4 guru */}
      {teachers.length > 4 && (
        <div className="mt-6 text-center">
          <Link
            href="/guru"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-orange-600 hover:to-amber-600 transform hover:-translate-y-0.5 transition-all duration-200 baloo tracking-wide"
          >
            <FaGraduationCap className="text-base" />
            <span>Lihat Profil Lengkap Seluruh Guru ({teachers.length})</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * Komponen Card Guru yang estetik dengan palet warna bergantian per guru,
 * serta proporsi foto yang menjaga kepala tidak terpotong.
 */
function TeacherCard({
  teacher,
  index = 0,
}: {
  teacher: Teacher;
  index?: number;
}) {
  const theme = COLOR_THEMES[index % COLOR_THEMES.length];

  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden border-2 ${theme.border} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group select-none`}
    >
      {/* Bagian Foto Guru dengan Background Nuansa Warna Guru */}
      <div
        className={`relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br ${theme.photoBg}`}
      >
        {teacher.img ? (
          <img
            src={teacher.img}
            alt={`Guru ${teacher.name} di Bimbel Kiddos Zone`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FaChalkboardTeacher className={`text-4xl ${theme.badgeIcon}`} />
            </div>
            <span className="text-xs font-bold text-gray-700 baloo">
              Bimbel Kiddos Zone
            </span>
          </div>
        )}
      </div>

      {/* Garis Aksen Warna Khas Guru */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${theme.accentBar}`} />

      {/* Bagian Informasi Guru */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center text-center bg-white">
        <div>
          {/* Nama Guru */}
          <h3
            className={`text-base sm:text-lg font-bold text-gray-800 baloo leading-snug ${theme.nameHover} transition-colors line-clamp-2 min-h-[2.75rem] flex items-center justify-center`}
          >
            {teacher.name}
          </h3>

          {/* Badge Mata Pelajaran / Program dengan Warna Senada Guru */}
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
      </div>
    </div>
  );
}
