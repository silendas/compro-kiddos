import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import { SITE_CONFIG } from "@data/siteConfig";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lime-300 text-green-700 p-6 md:p-10 border-t border-lime-400">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 text-sm md:text-base">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-2 baloo">Alamat Pusat</h3>
          <p>{SITE_CONFIG.contact.address.street},</p>
          <p>
            {SITE_CONFIG.contact.address.village}, Kec.{" "}
            {SITE_CONFIG.contact.address.subdistrict}, {SITE_CONFIG.contact.address.city}
          </p>
          <p>
            {SITE_CONFIG.contact.address.province}, Indonesia{" "}
            {SITE_CONFIG.contact.address.postalCode}
          </p>
        </div>

        <div className="text-center">
          <h3 className="font-bold text-lg mb-2 baloo">Media Sosial</h3>
          <p className="text-sm text-green-800 mb-3">
            Ikuti kami untuk update info dan kegiatan seru anak:
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Bimbel Kiddos Zone"
              className="p-2.5 bg-white rounded-full shadow hover:scale-110 transition duration-300"
            >
              <FaInstagram className="w-5 h-5 text-red-600" />
            </a>
            <a
              href={SITE_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Bimbel Kiddos Zone"
              className="p-2.5 bg-white rounded-full shadow hover:scale-110 transition duration-300"
            >
              <FaFacebookF className="w-5 h-5 text-blue-600" />
            </a>
            <a
              href={SITE_CONFIG.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Bimbel Kiddos Zone"
              className="p-2.5 bg-white rounded-full shadow hover:scale-110 transition duration-300"
            >
              <FaTiktok className="w-5 h-5 text-black" />
            </a>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg mb-2 baloo">Kontak Kami</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <FaWhatsapp className="w-5 h-5 text-green-600 flex-shrink-0" />
            <a
              href={SITE_CONFIG.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-900 font-medium"
            >
              {SITE_CONFIG.contact.phone} (WhatsApp)
            </a>
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <FaPhoneAlt className="w-4 h-4 text-gray-700 flex-shrink-0" />
            <a
              href={`tel:+${SITE_CONFIG.contact.whatsappNumber}`}
              className="hover:text-green-900 font-medium"
            >
              {SITE_CONFIG.contact.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="text-center text-xs md:text-sm font-semibold mt-8 pt-4 border-t border-lime-400">
        &copy; {currentYear} {SITE_CONFIG.name}. Hak Cipta Dilindungi.
      </div>
    </footer>
  );
}
