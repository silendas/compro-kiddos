"use client";

import { useState } from "react";
import {
  FaTimes,
  FaGlobe,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa";
import { SITE_CONFIG } from "@data/siteConfig";

export default function FlyingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      href: SITE_CONFIG.social.whatsapp,
      icon: <FaWhatsapp size={24} />,
      label: "WhatsApp",
      bg: "bg-green-500",
    },
    {
      href: SITE_CONFIG.social.instagram,
      icon: <FaInstagram size={24} />,
      label: "Instagram",
      bg: "bg-pink-500",
    },
    {
      href: SITE_CONFIG.social.tiktok,
      icon: <FaTiktok size={24} />,
      label: "TikTok",
      bg: "bg-black",
    },
    {
      href: SITE_CONFIG.social.facebook,
      icon: <FaFacebook size={24} />,
      label: "Facebook",
      bg: "bg-blue-600",
    },
  ];

  return (
    <aside
      className="fixed bottom-5 right-5 flex flex-col items-end space-y-2 z-50"
      aria-label="Tombol Kontak Cepat Media Sosial"
    >
      {isOpen && (
        <div className="flex flex-col items-end space-y-2 animate-fade-in">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition duration-300 ${social.bg}`}
              aria-label={`Hubungi via ${social.label}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white p-3.5 rounded-full shadow-xl hover:shadow-orange-500/40 ring-4 ring-amber-200/60 transition duration-300 flex items-center justify-center cursor-pointer"
        aria-label={
          isOpen ? "Tutup tombol sosial media" : "Buka tombol kontak sosial media"
        }
      >
        {isOpen ? <FaTimes size={22} /> : <FaGlobe size={26} />}
      </button>
    </aside>
  );
}
