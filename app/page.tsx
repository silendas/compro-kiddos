"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaWhatsapp, FaGraduationCap, FaBook } from "react-icons/fa";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@style/globals.css";

import { hero1, hero2, hero3 } from "@asset/hero";
import logo from "@asset/Logo_Kiddos.png";
import pendaftaran from "@asset/pendaftaran.png";
import {
  guru1,
  guru2,
  guru3,
  guru4,
  guru5,
  guru6,
  guru7,
  guru8,
  guru9,
  guru10,
} from "@asset/teacher";
import { galeri1, galeri2, galeri3, galeri4 } from "@asset/galery";
import {
  course1,
  course2,
  course3,
  course4,
  course5,
  course6,
  kidsbook,
} from "@asset/course";

const whatsappNumber = "6285156732275";
const whatsappMessage =
  "Halo, saya tertarik untuk mendaftar di Bimbel Kiddos Zone! Bisa Dibantu?";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
};

const MAX_SNIPPET_LENGTH = 300;

const programBelajar = [
  {
    title: "PraCalis",
    desc: "Program interaktif untuk anak usia 3-4,5 tahun yang mendukung perkembangan motorik dan kognitif melalui permainan edukatif.",
    img: course1,
  },
  {
    title: "Calistung",
    desc: "Program yang mengasah kemampuan membaca, menulis, dan berhitung dengan metode yang menyenangkan untuk anak usia 4-7 tahun.",
    img: course2,
  },
  {
    title: "Mapel SD",
    desc: "Menyajikan mata pelajaran untuk siswa SD dengan pendekatan praktis dan inovatif agar pembelajaran lebih menarik.",
    img: course3,
  },
  {
    title: "Mapel Matematika SD-SMA",
    desc: "Kursus matematika yang membangun pemahaman konsep secara mendalam, dari tingkat dasar hingga menantang, untuk mempersiapkan siswa menghadapi ujian.",
    img: course4,
  },
  {
    title: "Prisma Kalkulator Tangan TK & SD",
    desc: "Program khusus untuk melatih keterampilan berhitung cepat melalui kalkulator tangan dengan pendekatan yang menyenangkan bagi TK dan SD.",
    img: course5,
  },
  {
    title: "Bahasa Inggris TK-SMA",
    desc: "Kursus bahasa Inggris komprehensif yang mengutamakan interaksi dan komunikasi, cocok untuk semua jenjang mulai dari TK hingga SMA.",
    img: course6,
  },
];

const galeri = [galeri1, galeri2, galeri3, galeri4];

const pengajar = [
  { name: "Ibu Frida", subject: "Guru PraCalis & Calistung", img: guru1 },
  { name: "Ms Deti", subject: "Guru Bahasa Inggris", img: guru2 },
  { name: "Ibu Hana", subject: "Guru BTQ & Mapel Matematika", img: guru3 },
  { name: "Ms Dhifa", subject: "Guru Bahasa Inggris", img: guru4 },
  { name: "Ms Rara", subject: "Guru Prisma Kalkulator Tangan", img: guru5 },
  { name: "Ibu Dewi", subject: "Guru Calistung & Prisma", img: guru6 },
  {
    name: "Ibu Indri Dewi",
    subject: "Guru Private Calistung & BTQ",
    img: guru7,
  },
  { name: "Ms Tanti", subject: "Guru Calistung & BTQ", img: guru8 },
  { name: "Ms Icha", subject: "Guru PraCalis & Calistung", img: guru9 },
  { name: "Ibu Reni", subject: "Guru Calistung & Prisma", img: guru10 },
];

const branches = [
  {
    title: "Bimbel KIDDOS Zone Kenari",
    address:
      "Perumahan Taman Kenari, Blok D6 No 3, Cimahpar, Kec. Bogor Utara, Kota Bogor, Jawa Barat, Indonesia",
  },
  {
    title: "Bimbel KIDDOS Zone Poren",
    address:
      "Perumahan Pondok Aren, Jl. Bali No.151, Ciluar, Kec. Bogor Utara, Kota Bogor, Jawa Barat, Indonesia",
  },
  {
    title: "Bimbel KIDDOS Zone Alamanda",
    address:
      "Perumahan Mega Sentul Alamanda, Jl Adhenium 2, Blok R.15, Kec. Sukaraja, Kabupaten Bogor, Jawa Barat. Indonesia",
  },
  {
    title: "Bimbel KIDDOS Zone Cimahpar",
    address: "Kampung Petir RT 01 RW 04, Kel. Cimahpar, Kec. Bogor Utara, Kota Bogor, Jawa Barat, Indonesia",
  },
];

const sliderImages = [hero1, hero2, hero3];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/artikel?limit=3")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="beranda"
      className="flex flex-col items-center text-center bg-white"
    >
      <section className="w-full h-45 bg-lime-300 md:h-163 relative">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          modules={[Autoplay]}
          className="w-full h-full"
        >
          {sliderImages.map((img, index) => (
            <SwiperSlide key={index} className="relative w-full h-full">
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="w-full bg-lime-300 p-6 rounded-b-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <Image
              src={pendaftaran}
              alt="Gambar Pendaftaran"
              layout="responsive"
              objectFit="contain"
              width={300}
              height={100}
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 text-center">
            <h2 className="text-xl md:text-3xl font-bold text-cyan-800">
              Yuk! Daftar Bimbingan Belajar <br /> Di Bimbel KIDDOS ZONE
            </h2>
            <p className="mt-2 text-lg text-start text-cyan-800">
              Kami menyediakan berbagai macam program dari TK hingga SMA. Untuk
              info lebih lengkap, hubungi kami!
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              className="mt-4 inline-flex items-center bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              <FaWhatsapp className="mr-2 text-2xl" />
              Daftar via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section
        id="tentang-kami"
        className="w-full max-w-7xl py-12 px-6 md:px-20 text-black"
      >
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
            <div className="relative w-52 h-52 md:w-[350px] md:h-[350px] p-2 bg-transparent rounded-full transition-all duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,223,0,0.8)]">
              <Image
                src={logo}
                alt="Bimbel Kiddos Zone"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          <div className="md:w-1/2 text-left">
            <h2 className="text-base md:text-lg font-bold">Tentang Kami</h2>
            <h3 className="text-2xl md:text-3xl mt-1 md:mt-2 baloo font-black text-green-700">
              Bimbel KIDDOS ZONE
            </h3>
            <p className="mt-2 md:mt-3 text-lg md:text-xl leading-relaxed">
              Bimbel Kiddos Zone adalah lembaga pendidikan yang berkomitmen
              menyediakan program bimbingan belajar berkualitas untuk
              meningkatkan prestasi akademik serta keterampilan bahasa siswa.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed">
              Kami menghadirkan program yang dirancang khusus agar setiap siswa
              dapat belajar secara efektif dan mencapai potensi terbaiknya.
            </p>
            <p className="mt-4 text-lg md:text-xl leading-relaxed">
              Dengan tenaga pengajar profesional dan metode pembelajaran
              inovatif, kami menciptakan lingkungan belajar yang interaktif,
              nyaman, dan mendukung perkembangan siswa secara optimal.
            </p>
          </div>
        </div>
      </section>

      <hr className="w-4/5 border-t-2 border-gray-300 my-8 hidden md:block" />

      <section
        id="informasi-pengajar"
        className="mt-8 max-w-7xl px-7 md:px-4 py-8 bg-gray-200 md:bg-transparent"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="rounded-full bg-green-700 w-15 h-15 flex items-center justify-center mb-2">
            <FaGraduationCap size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-center text-green-700 baloo">
            Tenaga Pendidik
          </h2>
        </div>
        <p className="text-center text-lg text-gray-900 mb-8">
          Pengajar-pengajar terbaik yang akan mendampingi belajar siswa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pengajar.map((teacher, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <div className="relative h-100 md:h-64 w-full">
                <Image
                  src={teacher.img}
                  alt={teacher.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 bg-white md:bg-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 baloo">
                  {teacher.name}
                </h3>
                <p className="text-gray-600">{teacher.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto px-6 md:px-10 pt-10 pb-3 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-b from-lime-400 to-white">
          <div className="md:w-1/2">
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-3">
              <div className="rounded-full bg-green-700 p-3">
                <FaBook size={30} className="text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-700">
                Program Les
              </h2>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
              Program Bimbingan Belajar Dari Bimbel Kiddos Zone
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Kami menghadirkan fasilitas bimbingan belajar terbaik dengan tutor
              berkualitas dan kompeten. Materi disesuaikan untuk membantu siswa
              mencapai prestasi optimal di setiap jenjang.
            </p>
            <Link
              href="/program-les"
              className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
              Lihat Semua Program
            </Link>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image
                src={kidsbook}
                alt="Gambar Program Les"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programBelajar.map((program, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={program.img}
                    alt={program.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-800">
                  {program.title}
                </h4>
                <p className="text-sm text-gray-600 mt-2 flex-grow">
                  {program.desc}
                </p>
                <Link
                  href="/program-les"
                  className="mt-4 inline-block bg-green-700 text-white px-4 py-2 rounded-full text-center hover:bg-green-800 transition"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="galeri" className="w-full bg-lime-500 py-8 px-2 md:px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-white">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold baloo">
              Galeri Kami | Bimbel KIDDOS ZONE
            </h2>
            <p className="mt-1 text-sm md:text-base">
              Lihat berbagai kegiatan belajar siswa kami di sini!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm md:text-base">
              Lihat Galeri Kami Lainnya
            </span>
            <Link
              href="/galeri"
              className="bg-white text-lime-600 text-sm md:text-base px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              KLIK DISINI
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-3">
          {galeri.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden shadow-md hover:scale-105 transition"
            >
              <Image
                src={img}
                alt={`Galeri ${index + 1}`}
                width={300}
                height={200}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="artikel" className="mt-12 max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-gray-800 baloo">
          Artikel Terbaru
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden text-start"
            >
              <div className="p-6 flex flex-col h-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {article.title}
                </h2>
                <div className="text-gray-700 flex-grow">
                  {article.content.length > MAX_SNIPPET_LENGTH ? (
                    <>
                      <p>
                        {article.content.substring(0, MAX_SNIPPET_LENGTH)}...
                      </p>
                      <div className="mt-4">
                        <Link
                          href={`/artikel/${article.id}`}
                          className="text-blue-500 hover:underline font-medium"
                        >
                          Lihat selengkapnya
                        </Link>
                      </div>
                    </>
                  ) : (
                    <p>{article.content}</p>
                  )}
                </div>
                <small className="mt-6 text-gray-500">
                  {new Date(article.createdAt.seconds * 1000).toLocaleString()}
                </small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="lokasi"
        className="w-full py-10 mt-8 bg-gradient-to-b from-lime-500 to-lime-300 text-white"
      >
        <div className="max-w-5xl mx-auto px-4 baloo">
          <h2 className="text-3xl font-bold text-center mb-8">Lokasi Kami</h2>

          <div className="bg-white rounded-xl p-6 text-start text-gray-800">
            <h3 className="text-2xl font-bold mb-4">
              Cabang Bimbel KIDDOS Zone
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {branches.map((branch, index) => (
                <div key={index} className="p-4">
                  <h4 className="text-lg font-semibold text-green-600 mb-1">
                    {branch.title}
                  </h4>
                  <p className="text-gray-700 text-sm mb-2">{branch.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
