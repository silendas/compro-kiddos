"use client";

import { useState } from "react";
import { FaChevronDown, FaQuestionCircle, FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG } from "@data/siteConfig";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Program bimbingan belajar apa saja yang tersedia di Bimbel Kiddos Zone Bogor?",
    answer:
      "Bimbel Kiddos Zone Bogor menyediakan beragam program unggulan: PraCalis (usia 3–4,5 tahun), Calistung (Baca, Tulis, Hitung untuk usia TK/SD), Bimbingan Tematik & PR Mapel SD/SMP, Les Matematika interaktif (Prisma Kalkulator Tangan), Bahasa Inggris anak, BTQ Al-Qur'an (Mengaji & Iqro), hingga layanan les privat guru datang ke rumah.",
  },
  {
    question: "Di mana saja titik lokasi cabang Bimbel Kiddos Zone di wilayah Bogor?",
    answer:
      "Bimbel Kiddos Zone saat ini memiliki 3 cabang resmi di wilayah Bogor: Cabang Pondok Aren (Pusat - Jl. Bali No. 158, Ciluar, Bogor Utara), Cabang Taman Kenari (Office - Blok D6 No. 3, Cimahpar, Bogor Utara), dan Cabang Calistung Teras Cendekia (Perumahan Hollywood Blok A5 No. 15, Tanah Baru, Bogor Utara). Semua lokasi mudah dijangkau dan ramah anak.",
  },
  {
    question: "Apakah tersedia les privat guru datang langsung ke rumah di Bogor?",
    answer:
      "Ya, kami menyediakan program Les Privat di mana tutor/guru pilihan datang langsung ke rumah siswa di wilayah Kota Bogor dan Kabupaten Bogor. Jadwal belajar fleksibel disesuaikan dengan kebutuhan ananda dan orang tua.",
  },
  {
    question: "Berapa usia minimal anak untuk bisa mulai belajar di Kiddos Zone?",
    answer:
      "Anak dapat mulai belajar sejak usia 3 tahun melalui program PraCalis yang berfokus pada stimulasi motorik, pengenalan bentuk, warna, dan huruf melalui permainan edukatif. Untuk program Calistung reguler dimulai dari usia 4 hingga 7 tahun persiapan masuk SD.",
  },
  {
    question: "Bagaimana metode belajar Calistung di Bimbel Kiddos Zone?",
    answer:
      "Metode belajar kami mengusung prinsip 'Cerdas, Ceria, Bertaqwa' yang ramah anak (fun learning), tanpa paksaan atau tekanan. Ananda diajak belajar membaca, menulis, dan berhitung melalui kartu bergambar, permainan edukatif, dan pendekatan personal sesuai kecepatan belajar masing-masing anak.",
  },
  {
    question: "Bagaimana cara pendaftaran dan apakah ada konsultasi gratis?",
    answer:
      "Pendaftaran sangat mudah! Anda dapat berkonsultasi gratis terlebih dahulu mengenai kebutuhan ananda melalui WhatsApp resmi kami di 0851 5672 2275. Tim kami akan dengan senang hati membantu memilihkan program terbaik.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Halo, saya ingin bertanya lebih lanjut mengenai bimbingan belajar di Bimbel Kiddos Zone Bogor."
  )}`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-white border-orange-400 shadow-md ring-1 ring-orange-400/30"
                  : "bg-white border-amber-100 hover:border-orange-300 shadow-sm"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-semibold text-gray-800 transition"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <FaQuestionCircle
                    className={`text-lg shrink-0 transition ${
                      isOpen ? "text-orange-500" : "text-gray-400"
                    }`}
                  />
                  <span className="text-sm sm:text-base font-bold text-gray-900 baloo leading-snug">
                    {faq.question}
                  </span>
                </div>
                <FaChevronDown
                  className={`text-sm text-gray-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-orange-500" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed font-sans border-t border-amber-50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Small CTA under FAQ */}
      <div className="mt-8 text-center bg-amber-50/70 border border-amber-200 rounded-2xl p-5 sm:p-6">
        <h3 className="font-bold text-gray-800 baloo text-base sm:text-lg mb-1">
          Punya Pertanyaan Lain Seputar Bimbel Kiddos Zone Bogor?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4 font-sans">
          Konsultasikan kebutuhan belajar putra-putri Anda langsung dengan tim kami via WhatsApp.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow hover:shadow-orange-400/30 transition baloo"
        >
          <FaWhatsapp className="text-base" />
          <span>Tanya via WhatsApp (Respon Cepat)</span>
        </a>
      </div>
    </div>
  );
}
