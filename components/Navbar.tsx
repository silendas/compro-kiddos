"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "@asset/Logo_Kiddos.png";
import { event } from "@lib/gtag"; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Beranda", path: "/" },
    { name: "Tentang Kami", path: "/tentang-kami" },
    { name: "Program Les", path: "/program-les" },
    { name: "Artikel", path: "/artikel" },
    { name: "Galeri", path: "/galeri" },
  ];

  const whatsappNumber = "6285156732275";
  const whatsappMessage = encodeURIComponent("Halo, saya ingin mendaftar bimbel Kiddos Zone. Bisa dibantu?");

  const handleRegistrationClick = () => {
    event({
      action: "click_pendaftaran",
      category: "Pendaftaran",
      label: "Tombol Pendaftaran Navbar",
      value: 1,
    });
  };

  return (
    <nav className="bg-lime-300 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Bimbel Kiddos Zone" className="hidden md:flex" width={65} height={65} />
          <Image src={logo} alt="Bimbel Kiddos Zone" className="flex md:hidden" width={45} height={45} />
          <div className="flex flex-col pl-1">
            <span className="text-xl md:text-3xl font-bold text-green-700">Bimbel Kiddos Zone</span>
            <span className="text-sm md:text-lg text-red-600 font-bold">Cerdas Ceria Bertaqwa</span>
          </div>
        </Link>

        <button className="md:hidden text-gray-800 text-2xl p-2" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`absolute md:static top-16 left-0 w-full md:w-auto bg-lime-300 md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden"
        } md:flex items-center gap-4`}>
          {menuItems.map((item, index) => (
            <li key={index} className="py-2 md:py-0">
              <Link href={item.path} className="block text-green-700 hover:text-red-600 font-bold text-lg">
                {item.name}
              </Link>
            </li>
          ))}

          <li className="py-2 md:py-0">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-lg hover:bg-green-700 transition block text-center md:inline-block"
              onClick={handleRegistrationClick}
            >
              Pendaftaran
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
