"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "@asset/Logo_Kiddos.webp";
import { event } from "@lib/gtag";
import { SITE_CONFIG } from "@data/siteConfig";

const menuItems = [
  { name: "Beranda", path: "/" },
  { name: "Tentang Kami", path: "/tentang-kami" },
  { name: "Program Les", path: "/program-les" },
  { name: "Artikel", path: "/artikel" },
  { name: "Galeri", path: "/galeri" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Halo, saya ingin mendaftar bimbel Kiddos Zone. Bisa dibantu?"
  )}`;

  const handleRegistrationClick = () => {
    event({
      action: "click_pendaftaran",
      category: "Pendaftaran",
      label: "Tombol Pendaftaran Navbar",
      value: 1,
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-300 shadow-sm border-b border-amber-300">
      <nav
        className="container mx-auto flex justify-between items-center px-4 py-3 md:py-3.5"
        aria-label="Navigasi Utama Bimbel Kiddos Zone"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Kembali ke Beranda Bimbel Kiddos Zone"
        >
          <Image
            src={logo}
            alt="Logo Bimbel Kiddos Zone Bogor"
            className="hidden md:flex"
            width={58}
            height={58}
            priority
          />
          <Image
            src={logo}
            alt="Logo Bimbel Kiddos Zone Bogor"
            className="flex md:hidden"
            width={44}
            height={44}
            priority
          />
          <div className="flex flex-col pl-1 text-left">
            <span className="text-xl md:text-3xl font-extrabold text-orange-950 baloo leading-tight">
              {SITE_CONFIG.name}
            </span>
            <span className="text-xs md:text-sm text-orange-700 font-bold tracking-wide">
              {SITE_CONFIG.tagline}
            </span>
          </div>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-orange-950 text-2xl p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Buka Menu Navigasi"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Menu Links */}
        <ul
          className={`absolute top-full left-0 w-full bg-amber-300 border-t border-amber-400/60 shadow-xl p-5 md:p-0 md:static md:w-auto md:bg-transparent md:border-none md:shadow-none transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          } md:flex items-center gap-6`}
        >
          {menuItems.map((item, index) => (
            <li key={index} className="py-2.5 md:py-0 border-b border-amber-400/50 md:border-none">
              <Link
                href={item.path}
                onClick={() => setMenuOpen(false)}
                className="block text-orange-950 hover:text-orange-700 font-bold text-base md:text-lg transition baloo"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <li className="pt-3 md:pt-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-5 py-2 rounded-full font-bold text-base md:text-lg hover:bg-orange-600 transition block text-center md:inline-block shadow-md hover:shadow-orange-400/40 baloo"
              onClick={() => {
                setMenuOpen(false);
                handleRegistrationClick();
              }}
            >
              Pendaftaran
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
