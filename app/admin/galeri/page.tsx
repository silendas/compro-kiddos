"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSignOutAlt,
  FaPlus,
  FaTrash,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaCamera,
  FaImages,
  FaTimesCircle,
} from "react-icons/fa";

import { useAuth } from "@lib/authContext";
import {
  getGallery,
  addGalleryItem,
  deleteGalleryItem,
  GalleryItem,
} from "@lib/galleryService";
import { compressImage } from "@lib/imageCompressor";

export default function KelolaGaleriPage() {
  const { user, logout } = useAuth();

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
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
      const data = await getGallery();
      setGallery(data);
    } catch (err) {
      console.error("Gagal memuat galeri:", err);
      showToast("Gagal mengambil data galeri", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setTitle("");
    setImg("");
  };

  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    try {
      // Kompres resolusi foto ke 800x800 px kualitas 0.8
      const compressedBase64 = await compressImage(file, 800, 800, 0.8);
      setImg(compressedBase64);
      showToast("Foto berhasil dipilih & dikompres otomatis!", "success");
    } catch (err: unknown) {
      console.error("Gagal kompres foto:", err);
      showToast("Gagal memproses file foto", "error");
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!img) {
      showToast("Silakan pilih file foto terlebih dahulu", "error");
      return;
    }

    setSubmitting(true);
    try {
      await addGalleryItem({
        title: title.trim() || "Kegiatan Belajar Siswa",
        img,
      });
      showToast("Foto galeri baru berhasil disimpan!");
      resetForm();
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan foto galeri", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!window.confirm(`Hapus foto "${itemTitle}" dari galeri?`)) return;

    try {
      await deleteGalleryItem(id);
      showToast("Foto galeri berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus foto galeri", "error");
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
                <FaImages className="text-orange-500" /> Kelola Galeri Kegiatan
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Admin: <span className="font-semibold text-gray-700">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/galeri"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-800 bg-amber-100/70 hover:bg-amber-200/80 px-3 py-1.5 rounded-lg border border-amber-300 transition"
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
        {/* Form Upload Galeri Baru */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 baloo flex items-center gap-2">
              <FaPlus className="text-orange-500" /> Unggah Foto Kegiatan Baru
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Upload Area */}
            <div className="bg-amber-50/50 border-2 border-dashed border-amber-300 rounded-2xl p-6 text-center">
              {img ? (
                <div className="relative inline-block max-w-sm w-full mx-auto">
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-md border border-gray-200">
                    <img
                      src={img}
                      alt="Preview Galeri"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setImg("")}
                    className="absolute -top-3 -right-3 bg-red-600 text-white p-1.5 rounded-full shadow hover:bg-red-700 transition"
                    title="Ganti foto"
                  >
                    <FaTimesCircle className="text-xl" />
                  </button>
                </div>
              ) : (
                <div className="py-4">
                  <FaCamera className="text-4xl text-orange-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-800">
                    Pilih Foto Kegiatan Belajar / Acara Bimbel
                  </p>
                  <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                    Foto dari kamera atau galeri akan <strong>otomatis dikompres</strong> menjadi ukuran ringan dan cepat dimuat.
                  </p>

                  <label className="mt-4 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow cursor-pointer transition">
                    <FaCamera />
                    <span>Pilih Foto dari Perangkat</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      disabled={compressing}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {compressing && (
                <p className="text-xs text-orange-700 font-semibold mt-3 flex items-center justify-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  Sedang mengompres foto...
                </p>
              )}
            </div>

            {/* Input Judul */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="title">
                Judul / Keterangan Kegiatan (Opsional)
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Belajar Calistung Ceria Kelas Pagi"
                className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || compressing || !img}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <FaPlus /> Simpan ke Galeri
                </>
              )}
            </button>
          </form>
        </div>

        {/* Grid Foto Tersimpan */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 baloo">
              Daftar Foto Galeri Aktif ({gallery.length})
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
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Memuat foto galeri...
            </div>
          ) : gallery.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="font-medium text-sm">Belum ada foto kegiatan di galeri.</p>
              <p className="text-xs text-gray-400 mt-1">
                Gunakan form di atas untuk mengunggah dokumentasi kegiatan belajar anak.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group"
                >
                  <div className="relative aspect-[3/2] w-full bg-gray-200">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  <div className="p-3.5 flex items-center justify-between gap-2">
                    <p className="font-bold text-xs text-gray-800 line-clamp-1">
                      {item.title}
                    </p>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition shrink-0"
                    >
                      <FaTrash className="text-[10px]" /> Hapus
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
