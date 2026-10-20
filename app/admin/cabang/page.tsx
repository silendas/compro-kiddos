"use client";

import { useState, useEffect, FormEvent } from "react";
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
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSortNumericDown,
  FaBuilding,
  FaStar,
} from "react-icons/fa";

import { useAuth } from "@lib/authContext";
import {
  getBranches,
  addBranch,
  updateBranch,
  deleteBranch,
  seedInitialBranches,
  BranchItem,
} from "@lib/branchService";

export default function KelolaCabangPage() {
  const { user, logout } = useAuth();

  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [isHeadquarters, setIsHeadquarters] = useState(false);
  const [order, setOrder] = useState<number>(1);
  const [phone, setPhone] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getBranches();
      setBranches(data);
    } catch (err) {
      console.error("Gagal memuat data cabang:", err);
      showToast("Gagal mengambil data cabang", "error");
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
    setAddress("");
    setIsHeadquarters(false);
    setOrder(branches.length + 1);
    setPhone("");
    setMapsUrl("");
  };

  const handleEdit = (item: BranchItem) => {
    setEditingId(item.id || null);
    setTitle(item.title || "");
    setAddress(item.address || "");
    setIsHeadquarters(!!item.isHeadquarters);
    setOrder(item.order ?? 1);
    setPhone(item.phone || "");
    setMapsUrl(item.mapsUrl || "");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !address.trim()) {
      showToast("Nama cabang dan alamat wajib diisi", "error");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await updateBranch(editingId, {
          title: title.trim(),
          address: address.trim(),
          isHeadquarters,
          order: Number(order) || 0,
          phone: phone.trim() || undefined,
          mapsUrl: mapsUrl.trim() || undefined,
        });
        showToast("Lokasi cabang berhasil diperbarui!");
      } else {
        await addBranch({
          title: title.trim(),
          address: address.trim(),
          isHeadquarters,
          order: Number(order) || branches.length + 1,
          phone: phone.trim() || undefined,
          mapsUrl: mapsUrl.trim() || undefined,
        });
        showToast("Cabang baru berhasil ditambahkan!");
      }

      resetForm();
      await loadData();
    } catch (err) {
      console.error("Gagal menyimpan cabang:", err);
      showToast("Gagal menyimpan data cabang", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Yakin ingin menghapus cabang "${name}"?`)) {
      return;
    }

    try {
      await deleteBranch(id);
      showToast(`Cabang "${name}" berhasil dihapus`);
      if (editingId === id) resetForm();
      await loadData();
    } catch (err) {
      console.error("Gagal menghapus cabang:", err);
      showToast("Gagal menghapus cabang", "error");
    }
  };

  const handleSeed = async () => {
    if (!window.confirm("Muat 4 contoh lokasi cabang awal Kiddos Zone Bogor?")) {
      return;
    }
    setSeeding(true);
    try {
      const count = await seedInitialBranches();
      showToast(`Berhasil menambahkan ${count} contoh cabang!`);
      await loadData();
    } catch (err) {
      console.error("Gagal seed cabang:", err);
      showToast("Gagal memuat contoh cabang", "error");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50">
          <div
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl text-white font-semibold text-sm ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.type === "success" ? <FaCheck /> : <FaTimes />}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* Top Bar Admin */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
              title="Kembali ke Dashboard Admin"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <h1 className="text-xl font-extrabold text-gray-800 baloo leading-none">
                  Kelola Lokasi Cabang
                </h1>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Admin: <span className="font-semibold">{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/#lokasi"
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Header Description */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 md:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
              <FaMapMarkerAlt className="text-amber-200" /> Lokasi Cabang &amp; Titik Belajar
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold baloo leading-tight">
              Daftar Cabang Bimbel Kiddos Zone
            </h2>
            <p className="mt-2 text-sm text-amber-50 leading-relaxed font-sans">
              Kelola alamat dan nama cabang bimbel yang tampil di beranda utama untuk mempermudah calon wali murid menemukan lokasi bimbel terdekat.
            </p>
          </div>

          {branches.length === 0 && !loading && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="bg-white hover:bg-amber-50 text-orange-800 font-bold px-4 py-2.5 rounded-xl text-sm shadow transition flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              <FaBuilding />
              <span>{seeding ? "Memuat..." : "Muat Contoh Cabang Awal"}</span>
            </button>
          )}
        </div>

        {/* Layout Grid: Form (Kiri) & List Cabang (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Form Input (5 Kolom) */}
          <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                  {editingId ? <FaEdit /> : <FaPlus />}
                </div>
                <h3 className="text-lg font-bold text-gray-800 baloo">
                  {editingId ? "Edit Lokasi Cabang" : "Tambah Cabang Baru"}
                </h3>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-semibold text-gray-500 hover:text-red-500 transition"
                >
                  Batal Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Cabang */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Nama Cabang <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaBuilding />
                  </span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Bimbel KIDDOS Zone Kenari (Pusat)"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm font-semibold text-gray-800"
                    required
                  />
                </div>
              </div>

              {/* Alamat Lengkap */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Contoh: Perumahan Taman Kenari, Blok D6 No 3, Cimahpar, Kec. Bogor Utara, Kota Bogor"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-800 leading-relaxed"
                    required
                  />
                </div>
              </div>

              {/* Grid: Urutan & Nomor Kontak */}
              <div className="grid grid-cols-2 gap-3">
                {/* Urutan */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Urutan Tampil
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaSortNumericDown />
                    </span>
                    <input
                      type="number"
                      min={1}
                      value={order}
                      onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm font-semibold text-gray-800"
                    />
                  </div>
                </div>

                {/* Telepon / WA (opsional) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    No. Telepon / WA
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaPhoneAlt />
                    </span>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0851-xxxx-xxxx"
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-800"
                    />
                  </div>
                </div>
              </div>

              {/* Link Google Maps (opsional) */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Link Google Maps <span className="text-gray-400 font-normal lowercase">(opsional)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FaMapMarkerAlt />
                  </span>
                  <input
                    type="url"
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm text-gray-800"
                  />
                </div>
              </div>

              {/* Toggle: Kantor Pusat */}
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={isHeadquarters}
                    onChange={(e) => setIsHeadquarters(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-gray-800 flex items-center gap-1">
                      <FaStar className="text-amber-500 text-[11px]" /> Tandai Sebagai Kantor Pusat
                    </span>
                    <p className="text-gray-500 mt-0.5">
                      Beri tanda khusus bahwa cabang ini merupakan kantor pusat
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl shadow transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaCheck />
                  <span>
                    {submitting
                      ? "Menyimpan..."
                      : editingId
                      ? "Perbarui Cabang"
                      : "Simpan Cabang"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Kolom Daftar Cabang (7 Kolom) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 baloo">
                  Daftar Cabang Aktif ({branches.length})
                </h3>
                <p className="text-xs text-gray-500">
                  Data ini langsung tampil di halaman depan website Bimbel Kiddos Zone
                </p>
              </div>

              {branches.length > 0 && (
                <button
                  onClick={handleSeed}
                  disabled={seeding}
                  className="text-xs font-semibold text-orange-700 hover:text-orange-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 transition"
                  title="Tambah ulang cabang standar jika diperlukan"
                >
                  + Tambah Contoh
                </button>
              )}
            </div>

            {loading ? (
              <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-gray-400">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm">Memuat data cabang...</p>
              </div>
            ) : branches.length === 0 ? (
              <div className="bg-white border border-dashed border-gray-300 rounded-3xl p-10 text-center">
                <div className="w-16 h-16 bg-amber-50 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
                  <FaMapMarkerAlt />
                </div>
                <h4 className="text-lg font-bold text-gray-800 baloo">
                  Belum Ada Data Cabang
                </h4>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1 mb-4">
                  Tambahkan cabang pertama melalui form di sebelah kiri atau klik tombol di bawah untuk memuat data cabang awal.
                </p>
                <button
                  onClick={handleSeed}
                  disabled={seeding}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-sm transition inline-flex items-center gap-2"
                >
                  <FaBuilding />
                  <span>{seeding ? "Memuat..." : "Muat Contoh Cabang Awal"}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {branches.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="bg-white border border-gray-200 hover:border-orange-300 rounded-2xl p-5 shadow-sm transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center">
                          {item.order ?? index + 1}
                        </span>
                        <h4 className="text-base font-bold text-gray-900 baloo">
                          {item.title}
                        </h4>
                        {item.isHeadquarters && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            <FaStar className="text-amber-500" /> Kantor Pusat
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed font-sans">
                        {item.address}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-500">
                        {item.phone && (
                          <span className="flex items-center gap-1 text-gray-600">
                            <FaPhoneAlt className="text-green-600 text-[10px]" /> {item.phone}
                          </span>
                        )}
                        {item.mapsUrl && (
                          <a
                            href={item.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-800 hover:underline"
                          >
                            <FaMapMarkerAlt className="text-red-500 text-[10px]" /> Buka Maps <FaExternalLinkAlt className="text-[9px]" />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-xl text-orange-700 bg-amber-50 hover:bg-amber-100 transition"
                        title="Edit Cabang"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id!, item.title)}
                        className="p-2 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition"
                        title="Hapus Cabang"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
