"use client";

import { useEffect, useState } from "react";
import { getTeachers, Teacher } from "@lib/teacherService";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeachers()
      .then((data) => setTeachers(data))
      .catch((err) => console.warn("Gagal memuat guru:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <p className="text-sm font-sans">Memuat informasi tenaga pendidik...</p>
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="bg-white/80 border border-dashed border-amber-300 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-amber-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
          <FaChalkboardTeacher />
        </div>
        <h3 className="text-lg font-bold text-gray-800 baloo">
          Informasi Pengajar Sedang Diperbarui
        </h3>
        <p className="text-sm text-gray-500 mt-1 font-sans">
          Daftar tenaga pendidik berpengalaman Bimbel Kiddos Zone akan segera ditampilkan.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {teachers.map((teacher) => (
        <div
          key={teacher.id}
          className="bg-white shadow-lg rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300 flex flex-col border border-amber-100"
        >
          <div className="relative h-64 w-full bg-amber-50">
            {teacher.img ? (
              <img
                src={teacher.img}
                alt={`Guru Bimbel Kiddos Zone - ${teacher.name}`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-orange-500 bg-amber-100">
                <FaChalkboardTeacher className="text-5xl" />
                <span className="text-xs font-bold mt-2">Bimbel Kiddos Zone</span>
              </div>
            )}
          </div>
          <div className="p-4 bg-white text-center flex-1 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-800 baloo leading-tight">
              {teacher.name}
            </h3>
            <p className="text-sm text-green-700 font-semibold mt-1">
              {teacher.subject}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
