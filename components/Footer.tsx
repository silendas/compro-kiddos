import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">Bimbel Kiddos Zone</p>
        <p className="text-sm">Jl. Contoh No. 123, Bogor, Jawa Barat</p>
        <p className="text-sm">Telp: +62 812-3456-7890</p>

        <div className="flex justify-center gap-4 mt-4">
          <Link href="https://facebook.com" className="hover:text-gray-300">
            Facebook
          </Link>
          <Link href="https://instagram.com" className="hover:text-gray-300">
            Instagram
          </Link>
          <Link href="https://wa.me/6281234567890" className="hover:text-gray-300">
            WhatsApp
          </Link>
        </div>

        <p className="text-xs mt-4">
          &copy; {new Date().getFullYear()} Bimbel Kiddos Zone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
