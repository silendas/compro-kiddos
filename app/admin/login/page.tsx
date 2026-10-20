"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope, FaSignInAlt, FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";

import logo from "@asset/Logo_Kiddos.webp";
import { useAuth } from "@lib/authContext";

export default function AdminLoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  }, [user, router]);

  const showToast = (text: string, type: "success" | "error") => {
    setToast({ text, type });
    if (type === "error") {
      setTimeout(() => setToast(null), 4500);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setToast(null);

    if (!email.trim() || !password) {
      const msg = "Email dan kata sandi wajib diisi";
      setError(msg);
      showToast(msg, "error");
      return;
    }

    setSubmitting(true);
    try {
      const res = await login(email, password);

      if (res.success) {
        showToast("Berhasil masuk! Mengarahkan ke dashboard...", "success");
        setTimeout(() => {
          router.replace("/admin");
        }, 1000);
      } else {
        let errMsg = "Gagal masuk. Silakan periksa kembali email dan kata sandi Anda.";

        if (
          res.code === "auth/invalid-credential" ||
          res.code === "auth/user-not-found" ||
          res.code === "auth/wrong-password"
        ) {
          errMsg = "Email atau kata sandi yang Anda masukkan salah.";
        } else if (res.code === "auth/too-many-requests") {
          errMsg = "Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat lagi.";
        } else if (res.code === "auth/invalid-email") {
          errMsg = "Format email tidak valid.";
        } else if (res.code === "auth/network-request-failed") {
          errMsg = "Koneksi internet bermasalah. Silakan periksa jaringan Anda.";
        }

        setError(errMsg);
        showToast(errMsg, "error");
        setSubmitting(false);
      }
    } catch {
      const errMsg = "Terjadi kesalahan saat masuk. Silakan coba lagi.";
      setError(errMsg);
      showToast(errMsg, "error");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50/30 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div
            className={`px-5 py-3 rounded-2xl shadow-xl text-sm font-bold flex items-center gap-2.5 transition-all ${
              toast.type === "success"
                ? "bg-emerald-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success" ? <FaCheck className="text-base" /> : <FaTimes className="text-base" />}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-3 hover:scale-105 transition">
            <Image
              src={logo}
              alt="Logo Bimbel Kiddos Zone"
              width={70}
              height={70}
              priority
              className="mx-auto"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 baloo">
            Portal Admin Kiddos Zone
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Masuk untuk mengelola artikel &amp; ulasan testimoni
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
              Email Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope />
              </div>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kiddoszone.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="password">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <FaLock />
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-800 text-sm transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Memproses Masuk...</span>
              </>
            ) : (
              <>
                <FaSignInAlt />
                <span>Masuk ke Dashboard</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition font-medium"
          >
            <FaArrowLeft className="text-xs" /> Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
