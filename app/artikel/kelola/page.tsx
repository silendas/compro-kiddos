"use client";
import { useEffect, useState, FormEvent } from "react";

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: { seconds: number; nanoseconds: number };
};

export default function KelolaArtikel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const fetchArticles = () => {
    fetch("/api/artikel")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/artikel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    if (res.ok) {
      setTitle("");
      setContent("");
      setMessage("Artikel berhasil ditambahkan");
      fetchArticles();
    } else {
      setMessage("Gagal menambahkan artikel");
    }
  };

  const handleDelete = async (id: string) => {
    // Validasi konfirmasi hapus artikel
    if (!window.confirm("Apakah anda yakin ingin menghapus artikel ini?")) {
      return;
    }
    const res = await fetch(`/api/artikel?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage("Artikel berhasil dihapus");
      fetchArticles();
    } else {
      setMessage("Gagal menghapus artikel");
    }
  };

  return (
    <div className="mx-auto p-2 md:p-6 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">Kelola Artikel</h1>

      {message && (
        <p className="mb-4 text-center text-green-600 font-medium">
          {message}
        </p>
      )}

      {/* Form Tambah Artikel */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="title">
              Judul Artikel
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="content">
              Isi Artikel
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
          >
            Tambah Artikel
          </button>
        </form>
      </div>

      {/* Tabel Daftar Artikel */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                No.
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Judul
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
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
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(article.createdAt.seconds * 1000).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition min-w-[120px]"
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
                  className="px-6 py-4 text-center text-gray-500"
                >
                  Tidak ada artikel
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
