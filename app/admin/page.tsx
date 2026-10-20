"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaSignOutAlt,
  FaComments,
  FaNewspaper,
  FaStar,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaArrowRight,
  FaUserCircle,
  FaChalkboardTeacher,
  FaImages,
  FaBookOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useAuth } from "@lib/authContext";
import { getTestimonials, Testimonial } from "@lib/testimonialService";
import { getArticles, Article } from "@lib/articleService";
import { getTeachers, Teacher } from "@lib/teacherService";
import { getGallery, GalleryItem } from "@lib/galleryService";
import { getPrograms, Program } from "@lib/programService";
import { getBranches, BranchItem } from "@lib/branchService";

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      setLoading(true);
      try {
        const [tData, aData, gData, galData, pData, bData] = await Promise.all([
          getTestimonials(false),
          getArticles(),
          getTeachers(),
          getGallery(),
          getPrograms(),
          getBranches(),
        ]);
        setTestimonials(tData);
        setArticles(aData);
        setTeachers(gData);
        setGallery(galData);
        setPrograms(pData);
        setBranches(bData);
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar Admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <div>
              <h1 className="text-xl font-extrabold text-gray-800 baloo leading-none">
                Admin Panel Kiddos Zone
              </h1>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                <FaUserCircle className="text-gray-400" />
                Masuk sebagai: <span className="font-semibold text-gray-700">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition"
            >
              <FaExternalLinkAlt className="text-xs" /> Lihat Web Utama
            </Link>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition"
            >
              <FaSignOutAlt /> Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
              <FaShieldAlt className="text-amber-300" /> Area Terproteksi Admin
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold baloo leading-tight">
              Selamat Datang di Pusat Kelola Konten
            </h2>
            <p className="mt-2 text-sm md:text-base text-teal-50 leading-relaxed font-sans">
              Kelola seluruh konten website Bimbel Kiddos Zone secara dinamis: Program Les, Galeri Kegiatan, Tenaga Pendidik, Ulasan Testimoni, Artikel Edukasi, dan Lokasi Cabang.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Stat Program */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Program Les
              </p>
              <h3 className="text-2xl font-extrabold text-purple-600 baloo mt-0.5">
                {loading ? "..." : programs.length}
              </h3>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 text-lg shrink-0">
              <FaBookOpen />
            </div>
          </div>

          {/* Stat Galeri */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Foto Galeri
              </p>
              <h3 className="text-2xl font-extrabold text-amber-600 baloo mt-0.5">
                {loading ? "..." : gallery.length}
              </h3>
            </div>
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 text-lg shrink-0">
              <FaImages />
            </div>
          </div>

          {/* Stat Guru */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Guru / Tutor
              </p>
              <h3 className="text-2xl font-extrabold text-emerald-600 baloo mt-0.5">
                {loading ? "..." : teachers.length}
              </h3>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-lg shrink-0">
              <FaChalkboardTeacher />
            </div>
          </div>

          {/* Stat Testimoni */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Testimoni
              </p>
              <h3 className="text-2xl font-extrabold text-pink-600 baloo mt-0.5">
                {loading ? "..." : testimonials.length}
              </h3>
            </div>
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-500 text-lg shrink-0">
              <FaComments />
            </div>
          </div>

          {/* Stat Artikel */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Artikel
              </p>
              <h3 className="text-2xl font-extrabold text-teal-600 baloo mt-0.5">
                {loading ? "..." : articles.length}
              </h3>
            </div>
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-lg shrink-0">
              <FaNewspaper />
            </div>
          </div>

          {/* Stat Cabang */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Lokasi Cabang
              </p>
              <h3 className="text-2xl font-extrabold text-blue-600 baloo mt-0.5">
                {loading ? "..." : branches.length}
              </h3>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-lg shrink-0">
              <FaMapMarkerAlt />
            </div>
          </div>
        </div>

        {/* Action Cards: Navigasi Menu Kelola */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 baloo mb-4">
            Menu Pengelolaan Website
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Kelola Program */}
            <div className="bg-white border border-gray-200 hover:border-purple-300 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                  <FaBookOpen />
                </div>
                <h4 className="text-xl font-bold text-gray-800 baloo group-hover:text-purple-600 transition">
                  Kelola Program Belajar
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Tambah dan perbarui program les (Calistung, PraCalis, Mapel SD), atur deskripsi, cover, serta status program unggulan.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/admin/program"
                  className="inline-flex items-center justify-between w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition"
                >
                  <span>Buka Kelola Program ({programs.length})</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Card Kelola Galeri */}
            <div className="bg-white border border-gray-200 hover:border-amber-400 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                  <FaImages />
                </div>
                <h4 className="text-xl font-bold text-gray-800 baloo group-hover:text-amber-700 transition">
                  Kelola Galeri Foto
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Unggah dokumentasi foto kegiatan belajar anak dengan kompresi otomatis ringan, beri judul kegiatan, dan kelola album.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/admin/galeri"
                  className="inline-flex items-center justify-between w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition"
                >
                  <span>Buka Kelola Galeri ({gallery.length})</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Card Kelola Guru */}
            <div className="bg-white border border-gray-200 hover:border-emerald-300 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                  <FaChalkboardTeacher />
                </div>
                <h4 className="text-xl font-bold text-gray-800 baloo group-hover:text-emerald-600 transition">
                  Kelola Guru &amp; Tutor
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Tambah data tenaga pengajar baru, upload foto profil otomatis terkompres, serta atur mata pelajaran dan program yang diajar.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/admin/guru"
                  className="inline-flex items-center justify-between w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition"
                >
                  <span>Buka Kelola Guru ({teachers.length})</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Card Kelola Review */}
            <div className="bg-white border border-gray-200 hover:border-pink-300 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                  <FaStar />
                </div>
                <h4 className="text-xl font-bold text-gray-800 baloo group-hover:text-pink-600 transition">
                  Kelola Review &amp; Testimoni
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Tambah ulasan pengalaman orang tua baru melalui form input, atur rating bintang (1-5), upload foto avatar, dan perbarui testimoni.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/admin/review"
                  className="inline-flex items-center justify-between w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition"
                >
                  <span>Buka Kelola Review ({testimonials.length})</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Card Kelola Artikel */}
            <div className="bg-white border border-gray-200 hover:border-teal-300 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                  <FaNewspaper />
                </div>
                <h4 className="text-xl font-bold text-gray-800 baloo group-hover:text-teal-600 transition">
                  Kelola Artikel &amp; Berita
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Tulis artikel edukasi baru dengan form judul dan konten lengkap, publikasikan tips parenting, materi calistung, dan kelola postingan blog.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/admin/artikel"
                  className="inline-flex items-center justify-between w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition"
                >
                  <span>Buka Kelola Artikel ({articles.length})</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>

            {/* Card Kelola Cabang */}
            <div className="bg-white border border-gray-200 hover:border-blue-300 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition">
                  <FaMapMarkerAlt />
                </div>
                <h4 className="text-xl font-bold text-gray-800 baloo group-hover:text-blue-600 transition">
                  Kelola Lokasi Cabang
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Tambah dan kelola titik lokasi cabang bimbel di Bogor, tandai kantor pusat, nomor kontak WhatsApp cabang, dan link navigasi Google Maps.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/admin/cabang"
                  className="inline-flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow transition"
                >
                  <span>Buka Kelola Cabang ({branches.length})</span>
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
