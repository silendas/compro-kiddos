import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaGraduationCap, FaBook, FaMapMarkerAlt } from "react-icons/fa";

import HeroSlider from "@comp/HeroSlider";
import HomeArticles from "@comp/HomeArticles";
import TestimonialsSection from "@comp/TestimonialsSection";

import logo from "@asset/Logo_Kiddos.png";
import pendaftaran from "@asset/pendaftaran.png";
import kidsbook from "@asset/course/kidsbook.png";

import { SITE_CONFIG } from "@data/siteConfig";
import { PROGRAM_LIST } from "@data/programs";
import { TEACHER_LIST } from "@data/teachers";
import { GALLERY_LIST } from "@data/gallery";

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappMessage
  )}`;

  const featuredPrograms = PROGRAM_LIST.filter((p) => p.featured).slice(0, 6);
  const galleryPreview = GALLERY_LIST.slice(0, 4);

  return (
    <div id="beranda" className="flex flex-col items-center text-center bg-white scroll-mt-24">
      {/* Hero Swiper Slider */}
      <section className="w-full bg-lime-300 relative" aria-label="Banner Utama">
        <HeroSlider />
      </section>

      {/* Banner CTA Pendaftaran & H1 Utama */}
      <section className="w-full bg-lime-300 p-6 md:p-10 rounded-b-3xl shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <Image
              src={pendaftaran}
              alt="Pendaftaran Bimbingan Belajar Bimbel Kiddos Zone Bogor"
              width={420}
              height={260}
              priority
              className="w-auto h-auto max-h-72 object-contain"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start p-4 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-extrabold text-cyan-900 baloo leading-tight">
              Bimbingan Belajar & Les Privat Terbaik di Bogor
            </h1>
            <p className="mt-3 text-base md:text-xl text-cyan-900 leading-relaxed">
              Tingkatkan prestasi, keterampilan literasi, dan rasa percaya diri anak
              bersama <strong>Bimbel KIDDOS ZONE</strong>. Program belajar interaktif
              dari jenjang TK, SD, SMP hingga SMA.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 transition"
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
            <h2 className="text-2xl md:text-3xl mt-1 baloo font-black text-green-700">
              Bimbel KIDDOS ZONE Bogor
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed">
              Bimbel Kiddos Zone adalah lembaga pendidikan terpercaya di Bogor yang
              berkomitmen menyediakan bimbingan belajar berkualitas dengan metode
              yang interaktif, ceria, dan menyenangkan.
            </p>
            <p className="mt-3 text-base md:text-lg text-gray-700 leading-relaxed">
              Kami mendampingi anak-anak dalam menguasai Calistung (Membaca, Menulis,
              Berhitung), pelajaran sekolah, matematika, hingga bahasa asing
              dengan pendekatan yang disesuaikan dengan ritme belajar setiap anak.
            </p>
            <div className="mt-6">
              <Link
                href="/tentang-kami"
                className="inline-block border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-5 py-2.5 rounded-full transition"
              >
                Pelajari Profil Lengkap Kami &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="w-4/5 border-t border-gray-300 my-4 hidden md:block" />

      {/* Tenaga Pendidik Section */}
      <section
        id="informasi-pengajar"
        className="w-full max-w-7xl px-6 md:px-8 py-10 scroll-mt-24"
        aria-label="Tenaga Pendidik"
      >
        <div className="flex flex-col items-center mb-3">
          <div className="rounded-full bg-green-700 w-14 h-14 flex items-center justify-center mb-2">
            <FaGraduationCap size={32} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 baloo">
            Tenaga Pendidik Profesional
          </h2>
        </div>
        <p className="text-center text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Guru-guru sabar, ramah, dan berpengalaman yang siap mendampingi proses
          belajar anak agar lebih mudah memahami setiap materi pelajaran.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TEACHER_LIST.slice(0, 8).map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={teacher.img}
                  alt={`Guru ${teacher.name} di Bimbel Kiddos Zone`}
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <div className="p-4 bg-gray-50 flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-bold text-gray-800 baloo">
                  {teacher.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{teacher.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Les Section */}
      <section className="w-full bg-white py-12" aria-label="Program Belajar">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-6 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-b from-lime-300 to-white rounded-3xl">
          <div className="md:w-1/2 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-green-700 p-2.5">
                <FaBook size={24} className="text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-green-800 baloo">
                Pilihan Program Belajar
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-3 baloo">
              Program Bimbingan Belajar Unggulan Bimbel Kiddos Zone
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Mulai dari kelas Pra-Calistung balita, calistung intensif anak TK,
              pendampingan PR & tugas sekolah SD, persiapan ujian matematika,
              hingga kursus percakapan bahasa Inggris interaktif.
            </p>
            <Link
              href="/program-les"
              className="inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition shadow"
            >
              Lihat Semua 11 Program Kami &rarr;
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {featuredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-gray-50 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-44 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={program.img}
                      alt={`Program ${program.title} Bimbel Kiddos Zone Bogor`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 baloo">
                    {program.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {program.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <Link
                    href="/program-les"
                    className="inline-block text-green-700 hover:text-green-800 font-bold text-sm"
                  >
                    Detail Program & Pendaftaran &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Preview Section */}
      <section
        id="galeri"
        className="w-full bg-lime-500 py-10 px-4 md:px-8 scroll-mt-24"
        aria-label="Galeri Kegiatan"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-white text-left">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold baloo">
              Galeri Kegiatan Siswa
            </h2>
            <p className="mt-1 text-sm md:text-base text-lime-50">
              Dokumentasi aktivitas belajar seru dan prestasi anak-anak kami.
            </p>
          </div>

          <Link
            href="/galeri"
            className="bg-white text-green-800 text-sm md:text-base px-5 py-2.5 rounded-full font-bold hover:bg-gray-100 transition shadow"
          >
            Lihat Semua Foto Galeri &rarr;
          </Link>
        </div>

        <div className="max-w-7xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {galleryPreview.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition duration-300 relative aspect-[3/2]"
            >
              <Image
                src={item.img}
                alt={`Kegiatan belajar siswa Bimbel Kiddos Zone ${item.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
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
              Artikel & Tips Edukasi
            </h2>
            <p className="text-gray-600 mt-1">
              Panduan belajar dan informasi penting seputar tumbuh kembang anak.
            </p>
          </div>
          <Link
            href="/artikel"
            className="text-green-700 hover:text-green-800 font-bold"
          >
            Lihat Semua Artikel &rarr;
          </Link>
        </div>

        <HomeArticles />
      </section>

      {/* Lokasi Cabang Section (Local SEO) */}
      <section
        id="lokasi"
        className="w-full py-12 bg-gradient-to-b from-lime-500 to-lime-400 text-white scroll-mt-24"
        aria-label="Lokasi Cabang Bimbel di Bogor"
      >
        <div className="max-w-5xl mx-auto px-4 baloo">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-2xl text-red-600" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Lokasi Cabang Bimbel Kiddos Zone Bogor
            </h2>
          </div>
          <p className="text-lime-50 mb-8 max-w-xl mx-auto font-sans text-sm md:text-base">
            Kami hadir di beberapa titik strategis di Kota dan Kabupaten Bogor
            agar lebih dekat dan mudah dijangkau oleh buah hati Anda.
          </p>

          <div className="bg-white rounded-2xl p-6 md:p-8 text-start text-gray-800 shadow-xl font-sans">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SITE_CONFIG.branches.map((branch, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-green-400 transition"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                    <h3 className="text-lg font-bold text-green-700 baloo">
                      {branch.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {branch.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
