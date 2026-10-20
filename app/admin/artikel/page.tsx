"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaNewspaper,
} from "react-icons/fa";

import { useAuth } from "@lib/authContext";
import {
  getArticles,
  addArticle,
  deleteArticle,
  createSlug,
  Article,
} from "@lib/articleService";

export default function KelolaArtikelAdminPage() {
  const { user, logout } = useAuth();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      console.error("Gagal memuat artikel:", err);
      showToast("Gagal mengambil data artikel", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast("Judul dan isi artikel wajib diisi", "error");
      return;
    }

    setSubmitting(true);
    try {
      await addArticle(title.trim(), content.trim());
      setTitle("");
      setContent("");
      showToast("Artikel berhasil diterbitkan!");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan artikel", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, articleTitle: string) => {
    if (!window.confirm(`Hapus artikel "${articleTitle}"?`)) return;

    try {
      await deleteArticle(id);
      showToast("Artikel berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus artikel", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header Admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
            >
              <FaArrowLeft className="text-xs" /> Kembali
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 baloo leading-none flex items-center gap-2">
                <FaNewspaper className="text-teal-600" /> Kelola Artikel &amp; Berita
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Admin: <span className="font-semibold text-gray-700">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/artikel"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition"
            >
              <FaExternalLinkAlt className="text-xs" /> Lihat Semua Artikel
            </Link>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition"
            >
              <FaSignOutAlt /> Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50">
          <div
            className={`px-5 py-3 rounded-xl shadow-lg text-sm font-bold flex items-center gap-2 ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success" ? <FaCheck /> : <FaTimes />}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {/* Form Tambah Artikel */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 baloo flex items-center gap-2">
              <FaPlus className="text-teal-600" /> Tulis Artikel Baru
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="title">
                Judul Artikel *
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: 5 Cara Efektif Mendampingi Anak Belajar Calistung di Rumah"
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              {title.trim() && (
                <p className="mt-1.5 text-xs text-gray-500 font-mono">
                  🔗 <span className="font-semibold text-gray-700">URL SEO:</span> /artikel/
                  <span className="text-teal-600 font-bold">{createSlug(title)}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="content">
                Isi Lengkap Artikel *
              </label>
              <textarea
                id="content"
                required
                rows={7}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan materi panduan edukasi, tips belajar, atau pengumuman..."
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menerbitkan...
                  </>
                ) : (
                  <>
                    <FaPlus /> Terbitkan Artikel
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tabel Daftar Artikel */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 baloo">
              Daftar Artikel Terbit ({articles.length})
            </h2>
            <button
              onClick={loadData}
              className="text-xs text-gray-500 hover:text-gray-800 font-semibold"
            >
              Segarkan Data ⟳
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Memuat data artikel...
            </div>
          ) : articles.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="font-medium text-sm">Belum ada artikel yang diterbitkan.</p>
              <p className="text-xs text-gray-400 mt-1">
                Gunakan form di atas untuk menulis dan menerbitkan artikel baru.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">No</th>
                    <th className="px-4 py-3">Judul Artikel</th>
                    <th className="px-4 py-3">Cuplikan Konten</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3 text-center rounded-r-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articles.map((item, index) => {
                    const formattedDate = item.createdAt?.seconds
                      ? new Date(item.createdAt.seconds * 1000).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "-";

                    return (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-4 font-semibold text-gray-400 align-top">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 align-top font-bold text-gray-800 min-w-[200px]">
                          <Link
                            href={`/artikel/${item.slug || item.id}`}
                            target="_blank"
                            className="hover:text-teal-600 transition"
                          >
                            {item.title}
                          </Link>
                          {item.slug && (
                            <span className="block text-[11px] font-normal text-gray-400 font-mono mt-0.5">
                              /{item.slug}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 align-top text-gray-600 max-w-md">
                          <p className="line-clamp-2">{item.content}</p>
                        </td>
                        <td className="px-4 py-4 align-top whitespace-nowrap text-xs text-gray-500">
                          {formattedDate}
                        </td>
                        <td className="px-4 py-4 align-top whitespace-nowrap text-center">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href={`/artikel/${item.slug || item.id}`}
                              target="_blank"
                              className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg transition"
                            >
                              <FaExternalLinkAlt className="text-[10px]" /> Lihat
                            </Link>
                            <button
                              onClick={() => handleDelete(item.id, item.title)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition"
                            >
                              <FaTrash /> Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
