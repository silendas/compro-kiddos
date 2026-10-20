"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@lib/authContext";

export default function KelolaArtikelRedirect() {
  return (
    <ProtectedRoute>
      <RedirectContent />
    </ProtectedRoute>
  );
}

function RedirectContent() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/artikel");
  }, [router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-gray-600 font-medium text-sm">
        Mengarahkan ke Panel Kelola Artikel...
      </p>
    </div>
  );
}
