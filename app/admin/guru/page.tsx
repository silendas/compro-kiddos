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
  FaChalkboardTeacher,
  FaCamera,
  FaTimesCircle,
} from "react-icons/fa";

import { useAuth } from "@lib/authContext";
import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  Teacher,
} from "@lib/teacherService";
import { compressImage } from "@lib/imageCompressor";

export default function KelolaGuruPage() {
  const { user, logout } = useAuth();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
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
      const data = await getTeachers();
      setTeachers(data);
    } catch (err) {
      console.error("Gagal memuat data guru:", err);
      showToast("Gagal mengambil data guru", "error");
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
    setSubject("");
    setImg("");
  };

  const handleEdit = (item: Teacher) => {
    setEditingId(item.id);
    setName(item.name || "");
    setSubject(item.subject || "");
    setImg(item.img || "");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  // Upload & auto compress foto guru
  const handlePhotoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCompressing(true);
    try {
      // Kompres foto ke resolusi 400x400 px kualitas 0.82
      const compressedBase64 = await compressImage(file, 400, 400, 0.82);
      setImg(compressedBase64);
      showToast("Foto guru berhasil dikompres & siap disimpan!", "success");
    } catch (err: unknown) {
      console.error("Gagal kompres foto:", err);
      showToast("Gagal memproses file foto", "error");
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  const handleRemovePhoto = () => {
    setImg("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subject.trim()) {
      showToast("Nama guru dan bidang pengajar wajib diisi", "error");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateTeacher(editingId, {
          name: name.trim(),
          subject: subject.trim(),
          img: img.trim(),
        });
        showToast("Data guru berhasil diperbarui!");
      } else {
        await addTeacher({
          name: name.trim(),
          subject: subject.trim(),
          img: img.trim(),
        });
        showToast("Data guru baru berhasil disimpan!");
      }
      resetForm();
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menyimpan data guru", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, teacherName: string) => {
    if (!window.confirm(`Hapus data pengajar "${teacherName}"?`)) return;

    try {
      await deleteTeacher(id);
      showToast("Data guru berhasil dihapus");
      await loadData();
    } catch (err) {
      console.error(err);
      showToast("Gagal menghapus data guru", "error");
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
                <FaChalkboardTeacher className="text-orange-500" /> Kelola Guru &amp; Tutor
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Admin: <span className="font-semibold text-gray-700">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/tentang-kami#informasi-pengajar"
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
        {/* Form Input Guru */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 baloo flex items-center gap-2">
              {editingId ? (
                <>
                  <FaEdit className="text-orange-500" /> Edit Data Guru
                </>
              ) : (
                <>
                  <FaPlus className="text-orange-500" /> Form Input Guru / Tutor Baru
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
            {/* Bagian Upload Foto Guru */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                {img ? (
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-orange-300 shadow-sm relative group">
                    <img
                      src={img}
                      alt="Preview Foto Guru"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      title="Hapus foto ini"
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-2xl"
                    >
                      <FaTimesCircle className="text-2xl" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-amber-100 border-2 border-dashed border-amber-300 flex flex-col items-center justify-center text-orange-600">
                    <FaChalkboardTeacher className="text-3xl" />
                    <span className="text-[10px] font-bold mt-1">Belum Ada Foto</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">
                  Foto Profil Pengajar / Guru (Opsional)
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Foto akan <strong>otomatis dikompres</strong> menjadi ukuran sangat ringan (~30-50 KB). Format yang disarankan: JPG, PNG, atau WebP.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <label className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-gray-300 shadow-sm cursor-pointer transition">
                    <FaCamera className="text-orange-500 text-sm" />
                    <span>{img ? "Ganti Foto" : "Unggah Foto Guru"}</span>
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
                      onClick={handleRemovePhoto}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="name">
                  Nama Lengkap / Panggilan Guru *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ibu Frida / Ms Deti"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="subject">
                  Mata Pelajaran / Program Pengajar *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Guru PraCalis & Calistung"
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
                    <FaCheck /> Perbarui Guru
                  </>
                ) : (
                  <>
                    <FaPlus /> Simpan Guru
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

        {/* Tabel Daftar Guru */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 baloo">
              Daftar Guru &amp; Tutor Aktif ({teachers.length})
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
              Memuat data guru...
            </div>
          ) : teachers.length === 0 ? (
            <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="font-medium text-sm">Belum ada data guru/tutor yang tersimpan.</p>
              <p className="text-xs text-gray-400 mt-1">
                Gunakan form di atas untuk menambahkan guru dan mengunggah foto profil pengajar.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 rounded-l-lg">No</th>
                    <th className="px-4 py-3">Foto</th>
                    <th className="px-4 py-3">Nama Guru</th>
                    <th className="px-4 py-3">Bidang Pengajar</th>
                    <th className="px-4 py-3 text-center rounded-r-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {teachers.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4 font-semibold text-gray-400 align-middle">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 align-middle">
                        {item.img ? (
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-amber-200 shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-amber-100 text-orange-700 font-bold text-sm flex items-center justify-center shrink-0">
                            {item.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 font-bold text-gray-800 align-middle">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 align-middle">
                        <span className="inline-block text-xs bg-amber-50 text-orange-800 font-semibold px-2.5 py-1 rounded-full border border-amber-200/60">
                          {item.subject}
                        </span>
                      </td>
                      <td className="px-4 py-4 align-middle whitespace-nowrap text-center">
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
