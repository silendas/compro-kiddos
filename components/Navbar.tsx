"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Bimbel Kiddos Zone
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu */}
        <ul className={`md:flex gap-6 ${menuOpen ? "block" : "hidden"} md:block`}>
          <li>
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/tentang" className="text-gray-700 hover:text-blue-500">
              Tentang
            </Link>
          </li>
          <li>
            <Link href="/program" className="text-gray-700 hover:text-blue-500">
              Program
            </Link>
          </li>
          <li>
            <Link href="/kontak" className="text-gray-700 hover:text-blue-500">
              Kontak
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
