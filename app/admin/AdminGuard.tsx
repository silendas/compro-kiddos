"use client";

import { useAuth } from "@lib/authContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Tangani pathname dengan atau tanpa trailing slash, serta query params
  const normalizedPath = (pathname || "").replace(/\/+$/, "");
  const isLoginPage =
    normalizedPath === "/admin/login" ||
    normalizedPath.startsWith("/admin/login");

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [user, loading, isLoginPage, router]);

  // Izinkan halaman login dibuka tanpa autentikasi
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Tampilkan loading saat sedang memeriksa status login Firebase
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium text-sm">
          Memeriksa izin akses admin...
        </p>
      </div>
    );
  }

  // Jika belum login dan bukan halaman login, arahkan ke login
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium text-sm">
          Akses terbatas. Mengarahkan ke halaman login...
        </p>
        <a
          href="/admin/login"
          className="mt-3 text-xs text-orange-600 font-bold hover:underline"
        >
          Klik di sini jika halaman tidak berpindah otomatis
        </a>
      </div>
    );
  }

  // Sudah login terverifikasi
  return <>{children}</>;
}
