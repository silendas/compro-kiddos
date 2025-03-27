import type { Metadata } from "next";
import Navbar from "@comp/Navbar";
import Footer from "@comp/Footer";
import "@style/globals.css";

export const metadata: Metadata = {
  title: "Bimbel Kiddos Zone - Bimbel Terbaik di Bogor",
  description:
    "Bimbel Kiddos Zone di Bogor menyediakan bimbingan belajar terbaik untuk anak-anak dengan metode interaktif dan menyenangkan.",
  keywords: "bimbel bogor, bimbingan belajar anak, les privat bogor",
  authors: [{ name: "Bimbel Kiddos Zone", url: "https://www.bimbelkiddoszone.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Bimbel Kiddos Zone - Bimbel Terbaik di Bogor",
    description:
      "Bimbel Kiddos Zone di Bogor menyediakan bimbingan belajar terbaik untuk anak-anak dengan metode interaktif dan menyenangkan.",
    url: "https://www.bimbelkiddoszone.com",
    siteName: "Bimbel Kiddos Zone",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bimbel Kiddos Zone Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bimbel Kiddos Zone Bogor - Bimbel terbaik di Bogor",
    description:
      "Bimbel Kiddos Zone di Bogor menyediakan bimbingan belajar terbaik untuk anak-anak dengan metode interaktif dan menyenangkan.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-poppins bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
