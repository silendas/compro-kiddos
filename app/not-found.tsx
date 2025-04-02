"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@asset/Logo_Kiddos.png"
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
    <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-100">
      <Image src={logo} alt="Logo Kiddos Zone" width={150} height={150} className="mb-6" />
      <p className="text-xl text-gray-700 font-semibold mt-4">
        Oops! Halaman tidak ditemukan{dot}
      </p>
      <p className="text-lg text-gray-600 mt-2">
        Sepertinya halaman yang Anda cari tidak tersedia.
      </p>
      <Link href="/" className="mt-6 px-6 py-3 bg-green-500 text-white text-lg font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-300">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
