"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaBookOpen,
  FaCloudDownloadAlt,
  FaCamera,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";

import { useAuth } from "@lib/authContext";
import {
  getPrograms,
  addProgram,
  updateProgram,
  deleteProgram,
  seedInitialPrograms,
  Program,
} from "@lib/programService";
import { compressImage } from "@lib/imageCompressor";

export default function KelolaProgramPage() {
  const { user, logout } = useAuth();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [featured, setFeatured] = useState(true);
  const [compressing, setCompressing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getPrograms();
      setPrograms(data);
    } catch (err) {
      console.error("Gagal memuat program:", err);
      showToast("Gagal mengambil data program", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDesc("");
    setImg("");
    setFeatured(true);
  };

  const handleEdit = (item: Program) => {
    setEditingId(item.id);
    setTitle(item.title || "");
    setDesc(item.desc || "");
    setImg(item.img || "");
    setFeatured(item.featured ?? true);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    try {
      const compressedBase64 = await compressImage(file, 600, 400, 0.8);
      setImg(compressedBase64);
      showToast("Gambar program berhasil dikompres!", "success");
    } catch (err: unknown) {
      console.error("Gagal kompres gambar:", err);
      showToast("Gagal memproses file gambar", "error");
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      showToast("Nama program dan deskripsi wajib diisi", "error");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateProgram(editingId, {
          title: title.trim(),
          desc: desc.trim(),
          img: img.trim(),
          featured,
        });
        showToast("Program belajar berhasil diperbarui!");
      } else {
        await addProgram({
          title: title.trim(),
          desc: desc.trim(),
          img: img.trim(),
          featured,
        });
        showToast("Program belajar baru berhasil disimpan!");
      }
      resetForm();
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan program", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, programTitle: string) => {
    if (!window.confirm(`Hapus program "${programTitle}"?`)) return;

    try {
      await deleteProgram(id);
      showToast("Program belajar berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus program", "error");
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm("Muat 6 program belajar contoh (PraCalis, Calistung, Mapel SD, dll) ke database?")) {
      return;
    }

    try {
      const count = await seedInitialPrograms();
      showToast(`${count} program contoh berhasil dimuat!`);
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat program contoh", "error");
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
                <FaBookOpen className="text-purple-600" /> Kelola Program Belajar
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Admin: <span className="font-semibold text-gray-700">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/program-les"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 transition"
            >
              <FaExternalLinkAlt className="text-xs" /> Lihat di Web
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

      {/* Konten Utama */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        {/* Tombol Muat Default */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-purple-50 border border-purple-200 rounded-2xl p-4">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-purple-900">
              Sinkronisasi Program Belajar
            </h2>
            <p className="text-xs text-purple-700 mt-0.5">
              Program belajar yang disimpan akan langsung tampil pada halaman program les dan kartu unggulan beranda.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSeedDefaults}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl shadow-sm transition shrink-0"
          >
            <FaCloudDownloadAlt className="text-base" /> Muat Program Bawaan
          </button>
        </div>

        {/* Form Tambah/Edit Program */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 baloo flex items-center gap-2">
              {editingId ? (
                <>
                  <FaEdit className="text-purple-600" /> Edit Program Belajar
                </>
              ) : (
                <>
                  <FaPlus className="text-purple-600" /> Form Tambah Program Baru
                </>
              )}
            </h2>
            {editingId && (
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
                Mode Mengedit
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Upload Cover Program */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                {img ? (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-sm relative group">
                    <img
                      src={img}
                      alt="Preview Cover"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImg("")}
                      title="Hapus foto"
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-2xl"
                    >
                      <FaTimesCircle className="text-2xl" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-purple-100 border-2 border-dashed border-purple-300 flex flex-col items-center justify-center text-purple-600">
                    <FaBookOpen className="text-3xl" />
                    <span className="text-[10px] font-bold mt-1">Cover/Ikon</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">
                  Gambar / Cover Program (Opsional)
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Gambar otomatis dikompres ke ukuran ringan (~30-50 KB). Jika dikosongkan, program tetap tampil dengan ilustrasi bawaan.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-gray-300 shadow-sm cursor-pointer transition">
                    <FaCamera className="text-purple-600 text-sm" />
                    <span>{img ? "Ganti Gambar" : "Unggah Cover Program"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={compressing}
                      className="hidden"
                    />
                  </label>

                  {img && (
                    <button
                      type="button"
                      onClick={() => setImg("")}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-2 rounded-xl transition"
                    >
                      Hapus Gambar
                    </button>
                  )}

                  {compressing && (
                    <span className="text-xs text-purple-600 font-medium flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      Sedang mengompres gambar...
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="title">
                Nama Program Belajar *
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: PraCalis / Calistung / Mapel SD / Science Club"
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="desc">
                Deskripsi Program Belajar *
              </label>
              <textarea
                id="desc"
                required
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Jelaskan rentang usia anak, metode pembelajaran, materi yang diajarkan, serta manfaat bagi siswa..."
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <input
                id="featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
              />
              <label htmlFor="featured" className="text-xs font-bold text-gray-700 cursor-pointer flex items-center gap-1">
                <FaStar className="text-amber-400" /> Tampilkan sebagai Program Unggulan di Halaman Beranda
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting || compressing}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : editingId ? (
                  <>
                    <FaCheck /> Perbarui Program
                  </>
                ) : (
                  <>
                    <FaPlus /> Simpan Program
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm px-4 py-2.5 rounded-xl transition"
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabel Daftar Program */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 baloo">
              Daftar Program Belajar Aktif ({programs.length})
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
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Memuat data program...
            </div>
          ) : programs.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="font-medium text-sm">Belum ada program belajar yang tersimpan.</p>
              <p className="text-xs text-gray-400 mt-1">
                Gunakan form di atas atau klik tombol &quot;Muat Program Bawaan&quot; untuk mengisi kurikulum awal.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {programs.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-purple-300 transition"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-bold text-base text-gray-800 baloo">
                        {item.title}
                      </h3>
                      {item.featured && (
                        <span className="inline-flex items-center gap-1 text-[11px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full shrink-0 border border-amber-200">
                          <FaStar className="text-amber-500 text-[10px]" /> Unggulan
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
