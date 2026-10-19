"use client";

import { useState, FormEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope, FaSignInAlt, FaArrowLeft } from "react-icons/fa";

import logo from "@asset/Logo_Kiddos.png";
import { useAuth } from "@lib/authContext";

export default function AdminLoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  }, [user, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err: unknown) {
      console.error("Login error:", err);
      const authErr = err as { code?: string };
      if (
        authErr.code === "auth/invalid-credential" ||
        authErr.code === "auth/user-not-found" ||
        authErr.code === "auth/wrong-password"
      ) {
        setError("Email atau password yang Anda masukkan salah.");
      } else if (authErr.code === "auth/too-many-requests") {
        setError("Terlalu banyak percobaan gagal. Silakan coba beberapa saat lagi.");
      } else {
        setError("Gagal masuk. Pastikan koneksi internet stabil atau akun terdaftar.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-lime-50 via-teal-50 to-pink-50">
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 text-sm transition"
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-800 text-sm transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition duration-200 flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
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
