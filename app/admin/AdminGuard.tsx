"use client";

import { useAuth } from "@lib/authContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium text-sm">Memeriksa izin akses admin...</p>
      </div>
    );
  }

  // Jika belum login dan bukan halaman login, tahan render agar tidak bocor
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Akses terbatas. Mengarahkan ke halaman login...</p>
      </div>
    );
  }

  // Sudah login terverifikasi
  return <>{children}</>;
}
