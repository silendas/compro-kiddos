import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaGraduationCap, FaBook, FaMapMarkerAlt } from "react-icons/fa";

import HeroSlider from "@comp/HeroSlider";
import HomeArticles from "@comp/HomeArticles";
import TestimonialsSection from "@comp/TestimonialsSection";

import logo from "@asset/Logo_Kiddos.webp";
import pendaftaran from "@asset/pendaftaran.webp";
import kidsbook from "@asset/course/kidsbook.webp";

import { SITE_CONFIG } from "@data/siteConfig";
import HomeTeachers from "@comp/HomeTeachers";
import HomePrograms from "@comp/HomePrograms";
import HomeGallery from "@comp/HomeGallery";
import HomeBranches from "@comp/HomeBranches";
import HomeFaq from "@comp/HomeFaq";
import LearningMethodSection from "@comp/LearningMethodSection";

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappMessage
  )}`;

  return (
    <div id="beranda" className="flex flex-col items-center text-center bg-white scroll-mt-24">
      {/* Hero Swiper Slider */}
      <section className="w-full bg-amber-300 relative" aria-label="Banner Utama">
        <HeroSlider />
      </section>

      {/* Banner CTA Pendaftaran & H1 Utama */}
      <section className="w-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200 p-6 md:p-10 rounded-b-3xl shadow-sm border-b border-amber-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <Image
              src={pendaftaran}
              alt="Pendaftaran Bimbingan Belajar Bimbel Kiddos Zone Bogor"
              width={420}
              height={260}
              priority
              className="w-auto h-auto max-h-72 object-contain drop-shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-4 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-extrabold text-orange-950 baloo leading-tight">
              Bimbingan Belajar &amp; Les Privat Terbaik di Bogor
            </h1>
            <p className="mt-3 text-base md:text-xl text-orange-950/90 leading-relaxed font-sans">
              Tingkatkan prestasi, keterampilan literasi, dan rasa percaya diri anak
              bersama <strong>Bimbel KIDDOS ZONE</strong>. Program belajar interaktif
              dari jenjang TK, SD, SMP hingga SMA.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center bg-orange-500 text-white text-lg font-bold px-6 py-3 rounded-2xl shadow-lg hover:bg-orange-600 transition baloo"
              aria-label="Daftar Bimbingan Belajar via WhatsApp"
            >
              <FaWhatsapp className="mr-2 text-2xl" />
              Daftar via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section
        id="tentang-kami"
        className="w-full max-w-7xl py-12 px-6 md:px-20 text-black scroll-mt-24"
        aria-label="Tentang Kami"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-52 h-52 md:w-[320px] md:h-[320px] p-2 bg-transparent rounded-full transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,223,0,0.8)]">
              <Image
                src={logo}
                alt="Logo Bimbel Kiddos Zone Bogor"
                fill
                className="rounded-full object-cover"
                sizes="(max-width: 768px) 208px, 320px"
              />
            </div>
          </div>
          <div className="md:w-1/2 text-left">
            <span className="text-sm md:text-base font-bold text-gray-600 uppercase tracking-wide">
              Tentang Kami
            </span>
            <h2 className="text-2xl md:text-3xl mt-1 baloo font-black text-orange-600">
              Bimbel KIDDOS ZONE Bogor
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed font-sans">
              Bimbel Kiddos Zone adalah lembaga pendidikan terpercaya di Bogor yang
              berkomitmen menyediakan bimbingan belajar berkualitas dengan metode
              yang interaktif, ceria, dan menyenangkan.
            </p>
            <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed font-sans">
              Kami mendampingi anak-anak dalam menguasai Calistung (Membaca, Menulis,
              Berhitung), pelajaran sekolah, matematika, hingga bahasa asing
              dengan pendekatan yang disesuaikan dengan ritme belajar setiap anak.
            </p>
            <div className="mt-6">
              <Link
                href="/tentang-kami"
                className="inline-block border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-bold px-5 py-2.5 rounded-full transition baloo"
              >
                Pelajari Profil Lengkap Kami &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metode Belajar yang Terarah dan Terukur */}
      <LearningMethodSection />

      {/* Tenaga Pendidik Section */}
      <section
        id="informasi-pengajar"
        className="w-full max-w-7xl px-6 md:px-8 py-10 scroll-mt-24"
        aria-label="Tenaga Pendidik"
      >
        <div className="flex flex-col items-center mb-3">
          <div className="rounded-full bg-orange-500 w-14 h-14 flex items-center justify-center mb-2 shadow-md">
            <FaGraduationCap size={32} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600 baloo">
            Tenaga Pendidik Profesional
          </h2>
        </div>
        <p className="text-center text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-8 font-sans">
          Guru-guru sabar, ramah, dan berpengalaman yang siap mendampingi proses
          belajar anak agar lebih mudah memahami setiap materi pelajaran.
        </p>
        <HomeTeachers />
      </section>

      {/* Program Les Section */}
      <section className="w-full bg-white py-12" aria-label="Program Belajar">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-6 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-b from-amber-200 via-orange-50/60 to-white rounded-3xl border border-amber-200">
          <div className="md:w-1/2 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-orange-500 p-2.5 shadow-sm">
                <FaBook size={24} className="text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-orange-700 baloo">
                Pilihan Program Belajar
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 baloo">
              Program Bimbingan Belajar Unggulan Bimbel Kiddos Zone
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed font-sans">
              Mulai dari kelas Pra-Calistung balita, calistung intensif anak TK,
              pendampingan PR & tugas sekolah SD, persiapan ujian matematika,
              hingga kursus percakapan bahasa Inggris interaktif.
            </p>
            <Link
              href="/program-les"
              className="inline-block bg-orange-500 text-white font-bold px-6 py-3 rounded-full hover:bg-orange-600 transition shadow-md hover:shadow-orange-400/40 baloo"
            >
              Lihat Semua Program Kami &rarr;
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image
                src={kidsbook}
                alt="Buku dan Program Bimbingan Belajar Anak Bogor"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 256px, 320px"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 mt-8">
          <HomePrograms />
        </div>
      </section>

      {/* Galeri Preview Section */}
      <section
        id="galeri"
        className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 py-10 px-4 md:px-8 scroll-mt-24 shadow-sm"
        aria-label="Galeri Kegiatan"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-white text-left">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold baloo">
              Galeri Kegiatan Siswa
            </h2>
            <p className="mt-1 text-sm md:text-base text-amber-50 font-sans">
              Dokumentasi aktivitas belajar seru dan prestasi anak-anak kami.
            </p>
          </div>

          <Link
            href="/galeri"
            className="bg-white text-orange-600 text-sm md:text-base px-5 py-2.5 rounded-full font-bold hover:bg-amber-50 transition shadow baloo"
          >
            Lihat Semua Foto Galeri &rarr;
          </Link>
        </div>

        <HomeGallery />
      </section>

      {/* Cerita & Testimoni dari Orang Tua & Siswa */}
      <TestimonialsSection />

      {/* Artikel Terbaru Section */}
      <section
        id="artikel"
        className="w-full max-w-7xl mx-auto py-12 px-6 md:px-8 scroll-mt-24"
        aria-label="Artikel Terbaru"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-left mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 baloo">
              Artikel &amp; Tips Edukasi
            </h2>
            <p className="text-gray-600 mt-1 font-sans">
              Panduan belajar dan informasi penting seputar tumbuh kembang anak.
            </p>
          </div>
          <Link
            href="/artikel"
            className="text-orange-600 hover:text-orange-700 font-bold baloo text-base md:text-lg"
          >
            Lihat Semua Artikel &rarr;
          </Link>
        </div>

        <HomeArticles />
      </section>

      {/* Lokasi Cabang Section (Local SEO) */}
      <section
        id="lokasi"
        className="w-full py-12 bg-gradient-to-b from-amber-400 via-orange-400 to-orange-500 text-white scroll-mt-24 shadow-sm"
        aria-label="Lokasi Cabang Bimbel di Bogor"
      >
        <div className="max-w-5xl mx-auto px-4 baloo">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-2xl text-red-600" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Lokasi Cabang Bimbel Kiddos Zone Bogor
            </h2>
          </div>
          <p className="text-amber-50 mb-8 max-w-xl mx-auto font-sans text-sm md:text-base">
            Kami hadir di beberapa titik strategis di Kota dan Kabupaten Bogor
            agar lebih dekat dan mudah dijangkau oleh buah hati Anda.
          </p>

          <HomeBranches />
        </div>
      </section>

      {/* Tanya Jawab Seputar Bimbel Bogor (FAQ Section - Rich Snippets SEO) */}
      <section
        id="faq"
        className="w-full py-14 px-4 sm:px-6 lg:px-8 bg-amber-50/40 scroll-mt-24 border-t border-amber-100"
        aria-label="Tanya Jawab Seputar Bimbel Kiddos Zone Bogor"
      >
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-700 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
            FAQ &bull; Informasi Penting
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 baloo mt-3 mb-2">
            Pertanyaan yang Sering Diajukan Orang Tua
          </h2>
          <p className="text-gray-600 font-sans text-sm md:text-base max-w-xl mx-auto">
            Temukan jawaban seputar pendaftaran, metode belajar Calistung, lokasi cabang, hingga layanan les privat di Bogor.
          </p>
        </div>

        <HomeFaq />
      </section>
    </div>
  );
}
