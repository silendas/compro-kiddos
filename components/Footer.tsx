import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-lime-300 text-green-700 p-5">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-lg">
        <div className="text-center md:text-left mx-auto md:mx-0">
          <h3 className="font-bold text-lg">Alamat Pusat</h3>
          <p>Jl. Perumahan Taman Kenari, Blok D6 No 3 ,</p>
          <p>Cimahpar, Kec. Bogor Utara, Kota Bogor</p>
          <p>Jawa Barat, Indonesia 16155</p>
        </div>

        <div className="text-center">
          <h3 className="font-bold text-lg">Ikuti Kami</h3>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="https://www.instagram.com/bimbelkiddoszone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 text-red-600 hover:text-red-800 transition duration-300" />
            </a>
            <a
              href="https://www.facebook.com/share/18e1n5uo3y/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="w-6 h-6 text-blue-600 hover:text-blue-800 transition duration-300" />
            </a>
            <a
              href="https://www.tiktok.com/@bimbelkiddoszone1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="w-6 h-6 text-black hover:text-gray-700 transition duration-300" />
            </a>
          </div>
        </div>

        <div className="text-center gap-1 md:text-left max-w-xs mx-auto md:mx-0">
          <h3 className="font-bold text-lg">Hubungi Kami</h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaWhatsapp className="w-5 h-5 text-green-600" />
            <a
              href="https://wa.me/6285156732275"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-900"
            >
              085-15673-2275
            </a>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaPhoneAlt className="w-5 h-5 text-gray-700" />
            085-15673-2275
          </p>
        </div>
      </div>

      <div className="text-center text-xs md:text-sm font-semibold mt-4">
        &copy; 2025 Bimbel Kiddos Zone. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
