"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import {
  FaSignOutAlt,
  FaComments,
  FaNewspaper,
  FaStar,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaCloudDownloadAlt,
} from "react-icons/fa";

import { useAuth, ProtectedRoute } from "@lib/authContext";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  seedInitialTestimonials,
  Testimonial,
} from "@lib/testimonialService";
import {
  getArticles,
  addArticle,
  deleteArticle,
  Article,
} from "@lib/articleService";

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}

function AdminDashboardContent() {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"testimonials" | "articles">("testimonials");
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);

  const [tName, setTName] = useState("");
  const [tRole, setTRole] = useState("");
  const [tContent, setTContent] = useState("");
  const [tRating, setTRating] = useState<number>(5);
  const [tProgram, setTProgram] = useState("");
  const [savingTestimonial, setSavingTestimonial] = useState(false);

  // Articles State
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [savingArticle, setSavingArticle] = useState(false);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Fetch Testimonials
  const loadTestimonials = async () => {
    setLoadingTestimonials(true);
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat testimoni dari Firestore", "error");
    } finally {
      setLoadingTestimonials(false);
    }
  };

  // Fetch Articles
  const loadArticles = async () => {
    setLoadingArticles(true);
    try {
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat artikel dari Firestore", "error");
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
    loadArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Submit Testimonial (Add / Edit)
  const handleTestimonialSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!tName.trim() || !tContent.trim()) {
      showToast("Nama dan isi ulasan wajib diisi", "error");
      return;
    }

    setSavingTestimonial(true);
    try {
      if (editingTestimonialId) {
        // Edit existing
        await updateTestimonial(editingTestimonialId, {
          name: tName,
          role: tRole || "Orang Tua Siswa",
          content: tContent,
          rating: tRating,
          program: tProgram,
        });
        showToast("Testimoni berhasil diperbarui!");
      } else {
        // Add new
        await addTestimonial({
          name: tName,
          role: tRole || "Orang Tua Siswa",
          content: tContent,
          rating: tRating,
          program: tProgram,
        });
        showToast("Testimoni baru berhasil ditambahkan ke Firebase!");
      }

      resetTestimonialForm();
      await loadTestimonials();
    } catch (err) {
      console.error(err);
      showToast("Terjadi kesalahan saat menyimpan testimoni", "error");
    } finally {
      setSavingTestimonial(false);
    }
  };

  const startEditTestimonial = (item: Testimonial) => {
    setEditingTestimonialId(item.id);
    setTName(item.name);
    setTRole(item.role);
    setTContent(item.content);
    setTRating(item.rating || 5);
    setTProgram(item.program || "");
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTName("");
    setTRole("");
    setTContent("");
    setTRating(5);
    setTProgram("");
  };

  const handleDeleteTestimonial = async (id: string, name: string) => {
    if (!window.confirm(`Yakin ingin menghapus ulasan dari "${name}"?`)) return;

    try {
      await deleteTestimonial(id);
      showToast("Testimoni berhasil dihapus");
      await loadTestimonials();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus testimoni", "error");
    }
  };

  const handleSeedDefaultTestimonials = async () => {
    if (
      !window.confirm(
        "Apakah Anda ingin menyalin data testimoni bawaan (6 ulasan awal) ke database Firestore Anda?"
      )
    ) {
      return;
    }

    try {
      const count = await seedInitialTestimonials();
      showToast(`${count} ulasan berhasil disimpan ke Firestore!`);
      await loadTestimonials();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyalin testimoni ke Firestore", "error");
    }
  };

  // Handle Article Submit
  const handleArticleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim() || !articleContent.trim()) {
      showToast("Judul dan isi artikel wajib diisi", "error");
      return;
    }

    setSavingArticle(true);
    try {
      await addArticle(articleTitle, articleContent);
      setArticleTitle("");
      setArticleContent("");
      showToast("Artikel baru berhasil diterbitkan!");
      await loadArticles();
    } catch (err) {
      console.error(err);
      showToast("Gagal menambahkan artikel", "error");
    } finally {
      setSavingArticle(false);
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!window.confirm(`Yakin ingin menghapus artikel "${title}"?`)) return;

    try {
      await deleteArticle(id);
      showToast("Artikel berhasil dihapus");
      await loadArticles();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus artikel", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar Admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <div>
              <h1 className="text-xl font-extrabold text-gray-800 baloo leading-none">
                Admin Panel Kiddos Zone
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Login sebagai: <span className="font-semibold text-gray-700">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition"
            >
              <FaExternalLinkAlt className="text-xs" /> Lihat Web Utama
            </Link>
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition"
            >
              <FaSignOutAlt /> Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div
            className={`px-5 py-3 rounded-xl shadow-lg text-sm font-bold flex items-center gap-2 ${
              toastMessage.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toastMessage.type === "success" ? <FaCheck /> : <FaTimes />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-white rounded-t-2xl px-4 pt-2 shadow-sm">
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`flex items-center gap-2 py-3.5 px-5 font-bold text-sm md:text-base border-b-2 transition ${
              activeTab === "testimonials"
                ? "border-pink-500 text-pink-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FaComments className="text-lg" />
            <span>Kelola Testimoni ({testimonials.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`flex items-center gap-2 py-3.5 px-5 font-bold text-sm md:text-base border-b-2 transition ${
              activeTab === "articles"
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            <FaNewspaper className="text-lg" />
            <span>Kelola Artikel ({articles.length})</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: KELOLA TESTIMONI                                  */}
        {/* ======================================================== */}
        {activeTab === "testimonials" && (
          <div className="bg-white rounded-b-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 baloo">
                  Ulasan &amp; Cerita Orang Tua / Siswa
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Ulasan yang tersimpan di sini akan langsung tampil pada slider halaman depan website.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSeedDefaultTestimonials}
                className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl border border-gray-300 transition"
                title="Salin 6 data ulasan default ke database Firestore"
              >
                <FaCloudDownloadAlt className="text-base text-pink-500" />
                Simpan Ulasan Bawaan ke Firestore
              </button>
            </div>

            {/* Form Input / Edit Testimoni */}
            <div className="bg-pink-50/50 border border-pink-100 rounded-2xl p-5 md:p-6 mb-8">
              <h3 className="text-lg font-bold text-pink-700 baloo flex items-center gap-2 mb-4">
                {editingTestimonialId ? (
                  <>
                    <FaEdit /> Edit Testimoni
                  </>
                ) : (
                  <>
                    <FaPlus /> Tambah Testimoni Baru
                  </>
                )}
              </h3>

              <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nama Orang Tua / Siswa *
                    </label>
                    <input
                      type="text"
                      required
                      value={tName}
                      onChange={(e) => setTName(e.target.value)}
                      placeholder="Contoh: Ibu Dini"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Status / Kelas Siswa *
                    </label>
                    <input
                      type="text"
                      required
                      value={tRole}
                      onChange={(e) => setTRole(e.target.value)}
                      placeholder="Contoh: Orang Tua Siswa Kelas 2 SD"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Program Yang Diambil (Opsional)
                    </label>
                    <input
                      type="text"
                      value={tProgram}
                      onChange={(e) => setTProgram(e.target.value)}
                      placeholder="Contoh: PraCalis / Prisma / SD"
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Rating Bintang
                    </label>
                    <select
                      value={tRating}
                      onChange={(e) => setTRating(Number(e.target.value))}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                      <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Isi Testimoni / Pengalaman Belajar *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={tContent}
                      onChange={(e) => setTContent(e.target.value)}
                      placeholder="Tulis ulasan positif atau pengalaman anak selama belajar di Kiddos Zone..."
                      className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={savingTestimonial}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {savingTestimonial ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Menyimpan...
                      </>
                    ) : editingTestimonialId ? (
                      <>
                        <FaCheck /> Perbarui Testimoni
                      </>
                    ) : (
                      <>
                        <FaPlus /> Simpan ke Firebase
                      </>
                    )}
                  </button>

                  {editingTestimonialId && (
                    <button
                      type="button"
                      onClick={resetTestimonialForm}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm px-4 py-2.5 rounded-xl transition"
                    >
                      Batal Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Daftar Testimoni Tersimpan */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 baloo mb-3">
                Daftar Testimoni Aktif
              </h3>

              {loadingTestimonials ? (
                <div className="py-10 text-center text-gray-500">
                  <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Memuat data testimoni...
                </div>
              ) : testimonials.length === 0 ? (
                <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  Belum ada testimoni tersimpan.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testimonials.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-800 text-base baloo">
                            {item.name}
                          </span>
                          <div className="flex text-amber-400 text-xs gap-0.5">
                            {[...Array(item.rating || 5)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-pink-600 font-semibold mb-2">
                          {item.role} {item.program ? `• ${item.program}` : ""}
                        </p>

                        <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-4">
                          {item.content}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => startEditTestimonial(item)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded-lg transition"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(item.id, item.name)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 px-2.5 py-1.5 rounded-lg transition"
                        >
                          <FaTrash /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: KELOLA ARTIKEL                                    */}
        {/* ======================================================== */}
        {activeTab === "articles" && (
          <div className="bg-white rounded-b-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 baloo">
                Artikel Edukasi &amp; Tips Belajar
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Kelola artikel yang terbit di blog Bimbel Kiddos Zone Bogor.
              </p>
            </div>

            {/* Form Tambah Artikel */}
            <div className="bg-teal-50/50 border border-teal-100 rounded-2xl p-5 md:p-6 mb-8">
              <h3 className="text-lg font-bold text-teal-800 baloo flex items-center gap-2 mb-4">
                <FaPlus /> Tulis Artikel Baru
              </h3>
              <form onSubmit={handleArticleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Judul Artikel *
                  </label>
                  <input
                    type="text"
                    required
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    placeholder="Contoh: 5 Cara Menyenangkan Melatih Anak Membaca Tanpa Paksaan"
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Isi Lengkap Artikel *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}
                    placeholder="Tulis materi artikel, panduan, atau tips belajar anak..."
                    className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingArticle}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
                >
                  {savingArticle ? (
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
              </form>
            </div>

            {/* Daftar Artikel */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 baloo mb-3">
                Daftar Artikel Terbit ({articles.length})
              </h3>

              {loadingArticles ? (
                <div className="py-10 text-center text-gray-500">
                  <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Memuat data artikel...
                </div>
              ) : articles.length === 0 ? (
                <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  Belum ada artikel yang diterbitkan.
                </div>
              ) : (
                <div className="space-y-3">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-teal-300 transition"
                    >
                      <div>
                        <h4 className="font-bold text-gray-800 text-base hover:text-teal-600 transition">
                          <Link href={`/artikel/${art.id}`} target="_blank">
                            {art.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {art.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/artikel/${art.id}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
                        >
                          <FaExternalLinkAlt className="text-xs" /> Baca
                        </Link>
                        <button
                          onClick={() => handleDeleteArticle(art.id, art.title)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                        >
                          <FaTrash className="text-xs" /> Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
