"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@asset/Logo_Kiddos.webp";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const [dot, setDot] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDot((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center bg-gray-50 px-4 py-16">
      <title>404 - Halaman Tidak Ditemukan | Bimbel Kiddos Zone</title>
      <meta name="robots" content="noindex, nofollow" />
      <Image
        src={logo}
        alt="Logo Bimbel Kiddos Zone"
        width={140}
        height={140}
        priority
        className="mb-4"
      />
      <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mt-2 baloo">
        Oops! Halaman Tidak Ditemukan{dot}
      </h1>
      <p className="text-base md:text-lg text-gray-600 mt-2 max-w-md">
        Sepertinya halaman yang Anda cari telah dipindahkan atau tautan yang Anda masukkan salah.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-orange-500 text-white text-base md:text-lg font-bold rounded-full shadow hover:bg-orange-600 transition duration-300"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
