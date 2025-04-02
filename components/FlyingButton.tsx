"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaTimes,
  FaGlobe,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa";

export default function FlyingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      href: "https://wa.me/6285156732275",
      icon: <FaWhatsapp size={25} />,
      label: "WhatsApp",
      bg: "bg-green-500",
    },
    {
      href: "https://www.instagram.com/bimbelkiddoszone",
      icon: <FaInstagram size={25} />,
      label: "Instagram",
      bg: "bg-pink-500",
    },
    {
      href: "https://www.tiktok.com/@bimbelkiddoszone1",
      icon: <FaTiktok size={25} />,
      label: "TikTok",
      bg: "bg-black",
    },
    {
      href: "https://www.facebook.com/share/18e1n5uo3y/",
      icon: <FaFacebook size={25} />,
      label: "Facebook",
      bg: "bg-blue-600",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-2 z-50">
      {isOpen && (
        <div className="flex flex-col items-end space-y-2">
          {socialLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center text-white p-2.5 rounded-full shadow-lg hover:opacity-80 transition duration-300 ${social.bg}`}
              aria-label={`Buka ${social.label}`}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
        aria-label={
          isOpen ? "Tutup tombol sosial media" : "Buka tombol sosial media"
        }
      >
        {isOpen ? <FaTimes size={22} /> : <FaGlobe size={26} />}
      </button>
    </div>
  );
}
