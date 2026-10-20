"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSignOutAlt,
  FaStar,
  FaPlus,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaExternalLinkAlt,
  FaCloudDownloadAlt,
  FaCommentDots,
  FaCamera,
  FaTimesCircle,
} from "react-icons/fa";

import { useAuth } from "@lib/authContext";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  seedInitialTestimonials,
  Testimonial,
} from "@lib/testimonialService";
import { compressImage } from "@lib/imageCompressor";

export default function KelolaReviewPage() {
  const { user, logout } = useAuth();

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [program, setProgram] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [content, setContent] = useState("");
  const [avatar, setAvatar] = useState<string>("");
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
      const data = await getTestimonials(false);
      setTestimonials(data);
    } catch (err) {
      console.error("Gagal memuat testimoni:", err);
      showToast("Gagal mengambil data review", "error");
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
    setName("");
    setRole("");
    setProgram("");
    setRating(5);
    setContent("");
    setAvatar("");
  };

  const handleEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setName(item.name || "");
    setRole(item.role || "");
    setProgram(item.program || "");
    setRating(item.rating || 5);
    setContent(item.content || "");
    setAvatar(item.avatar || "");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Handler upload & auto compress gambar avatar
  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    try {
      // Otomatis kompres gambar ke resolusi 256x256 px kualitas 0.8
      const compressedBase64 = await compressImage(file, 256, 256, 0.8);
      setAvatar(compressedBase64);
      showToast("Foto berhasil dipilih & dikompres otomatis!", "success");
    } catch (err: unknown) {
      console.error("Gagal kompres foto:", err);
      showToast("Gagal memproses file foto", "error");
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      showToast("Nama pengulas dan isi review wajib diisi", "error");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateTestimonial(editingId, {
          name: name.trim(),
          role: role.trim() || "Orang Tua Siswa",
          program: program.trim(),
          rating,
          content: content.trim(),
          avatar: avatar.trim(),
        });
        showToast("Review berhasil diperbarui!");
      } else {
        await addTestimonial({
          name: name.trim(),
          role: role.trim() || "Orang Tua Siswa",
          program: program.trim(),
          rating,
          content: content.trim(),
          avatar: avatar.trim(),
        });
        showToast("Review baru berhasil disimpan!");
      }
      resetForm();
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan review", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, reviewerName: string) => {
    if (!window.confirm(`Hapus ulasan dari "${reviewerName}"?`)) return;

    try {
      await deleteTestimonial(id);
      showToast("Review berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus review", "error");
    }
  };

  const handleSeedDefaults = async () => {
    if (
      !window.confirm(
        "Muat 6 data review default contoh ke daftar ulasan?"
      )
    ) {
      return;
    }

    try {
      const count = await seedInitialTestimonials();
      showToast(`${count} review default berhasil dimuat!`);
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal memuat review default", "error");
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
                <FaCommentDots className="text-orange-500" /> Kelola Review &amp; Testimoni
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Admin: <span className="font-semibold text-gray-700">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/#testimoni"
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
        {/* Tombol Salin Default */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-orange-950">
              Sinkronisasi Data Review
            </h2>
            <p className="text-xs text-amber-800 mt-0.5">
              Review yang tersimpan akan langsung tampil pada slider ulasan di halaman beranda.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSeedDefaults}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl shadow-sm transition shrink-0"
          >
            <FaCloudDownloadAlt className="text-base" /> Muat Review Default
          </button>
        </div>

        {/* Form Input Review (Mirip Form Kelola News) */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 baloo flex items-center gap-2">
              {editingId ? (
                <>
                  <FaEdit className="text-orange-500" /> Edit Data Review
                </>
              ) : (
                <>
                  <FaPlus className="text-orange-500" /> Form Input Review Baru
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
            {/* Bagian Upload Avatar Foto */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                {avatar ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-400 shadow-sm relative group">
                    <img
                      src={avatar}
                      alt="Preview Avatar"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      title="Hapus foto ini"
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full"
                    >
                      <FaTimesCircle className="text-xl" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-sm baloo border-2 border-white">
                    {name.trim()
                      ? name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                      : "Foto"}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">
                  Foto Avatar Orang Tua / Siswa (Opsional)
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Foto akan <strong>otomatis dikompres</strong> menjadi ukuran ringan (~15-30 KB). Jika tidak mengunggah foto, sistem akan menampilkan avatar inisial nama.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-gray-300 shadow-sm cursor-pointer transition">
                    <FaCamera className="text-orange-500 text-sm" />
                    <span>{avatar ? "Ganti Foto" : "Unggah Foto Avatar"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={compressing}
                      className="hidden"
                    />
                  </label>

                  {avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-2 rounded-xl transition"
                    >
                      Hapus Foto
                    </button>
                  )}

                  {compressing && (
                    <span className="text-xs text-orange-600 font-medium flex items-center gap-1.5">
                      <div className="w-3.5 h-3.5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                      Sedang mengompres foto...
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="name">
                  Nama Orang Tua / Pengulas *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ibu Sarah / Bapak Rudi"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="role">
                  Status / Kelas Siswa
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Orang Tua Siswa Kelas 2 SD"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="program">
                  Program Yang Diambil (Opsional)
                </label>
                <input
                  id="program"
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  placeholder="Contoh: Calistung / Bimbel SD"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Rating Bintang
                </label>
                <div className="flex items-center gap-1.5 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition ${
                        star <= rating ? "text-amber-400 hover:scale-110" : "text-gray-300"
                      }`}
                      title={`${star} Bintang`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-600 ml-2">({rating}/5)</span>
                </div>
              </div>

              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="content">
                  Isi Ulasan / Pengalaman Belajar *
                </label>
                <textarea
                  id="content"
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan cerita ulasan atau pengalaman ananda selama belajar di Bimbel Kiddos Zone..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting || compressing}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow transition flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </>
                ) : editingId ? (
                  <>
                    <FaCheck /> Perbarui Review
                  </>
                ) : (
                  <>
                    <FaPlus /> Simpan Review
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

        {/* Tabel Daftar Review Tersimpan */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 baloo">
              Daftar Review Aktif ({testimonials.length})
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
              Memuat data review...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="font-medium text-sm">Belum ada review yang tersimpan.</p>
              <p className="text-xs text-gray-400 mt-1">
                Gunakan form di atas untuk menambah review baru atau klik tombol &quot;Muat Review Default&quot;.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">No</th>
                    <th className="px-4 py-3">Pengulas</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Isi Ulasan</th>
                    <th className="px-4 py-3 text-center rounded-r-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {testimonials.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 font-semibold text-gray-400 align-top">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 align-top min-w-[200px]">
                        <div className="flex items-center gap-3">
                          {item.avatar ? (
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover border border-amber-200 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-xs shrink-0 baloo">
                              {item.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-xs text-orange-600 font-medium">{item.role}</p>
                            {item.program && (
                              <span className="inline-block mt-0.5 text-[10px] bg-amber-50 text-orange-800 font-semibold px-2 py-0.2 rounded-full border border-amber-200/60">
                                {item.program}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 align-top whitespace-nowrap">
                        <div className="flex text-amber-400 text-xs gap-0.5">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <span className="text-[11px] text-gray-400 block mt-1">
                          {item.rating || 5} Bintang
                        </span>
                      </td>
                      <td className="px-4 py-4 align-top max-w-md">
                        <p className="text-gray-700 leading-relaxed italic line-clamp-3">
                          &ldquo;{item.content}&rdquo;
                        </p>
                      </td>
                      <td className="px-4 py-4 align-top whitespace-nowrap text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleEdit(item)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition"
                          >
                            <FaTrash /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
