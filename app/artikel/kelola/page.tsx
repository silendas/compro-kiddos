"use client";

import { useEffect, useState, FormEvent } from "react";
import {
  getArticles,
  addArticle,
  deleteArticle,
  Article,
} from "@lib/articleService";

export default function KelolaArtikel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fetchArticles = () => {
    getArticles()
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error memuat artikel:", err));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      await addArticle(title, content);
      setTitle("");
      setContent("");
      setMessage("Artikel berhasil ditambahkan");
      fetchArticles();
    } catch (err) {
      console.error(err);
      setMessage("Gagal menambahkan artikel");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Apakah anda yakin ingin menghapus artikel ini?")) {
      return;
    }
    try {
      await deleteArticle(id);
      setMessage("Artikel berhasil dihapus");
      fetchArticles();
    } catch (err) {
      console.error(err);
      setMessage("Gagal menghapus artikel");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6 md:pt-10 pb-16 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-center baloo text-gray-800">
        Kelola Artikel
      </h1>

      {message && (
        <p className="mb-4 text-center text-green-600 font-medium bg-green-50 py-2 rounded-lg border border-green-200">
          {message}
        </p>
      )}

      {/* Form Tambah Artikel */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 baloo">
          Tambah Artikel Baru
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700" htmlFor="title">
              Judul Artikel
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Masukkan judul artikel"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700" htmlFor="content">
              Isi Artikel
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Tuliskan isi artikel lengkap..."
              required
              rows={6}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-700 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-green-800 transition disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Menyimpan..." : "Tambah Artikel"}
          </button>
        </form>
      </div>

      {/* Tabel Daftar Artikel */}
      <div className="bg-white shadow-md rounded-xl border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map((article, index) => (
              <tr
                key={article.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {article.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date((article.createdAt?.seconds || Date.now() / 1000) * 1000).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition cursor-pointer"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-gray-500 text-sm"
                >
                  Belum ada artikel
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
