import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@comp/Navbar";
import Footer from "@comp/Footer";
import FlyingButton from "@comp/FlyingButton";
import "@style/globals.css";

export const metadata: Metadata = {
  title: "Bimbel Kiddos Zone - Bimbel Terbaik di Bogor",
  description:
    "Bimbingan Belajar di Bogor menyediakan bimbingan belajar terbaik untuk anak-anak dengan metode interaktif dan menyenangkan.",
  keywords: "bimbel bogor, bimbingan belajar, les privat bogor, bimbel, les bogor, bimbel di bogor, les di bogor",
  authors: [{ name: "Bimbel Kiddos Zone", url: "https://www.bimbelkiddoszone.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Bimbel Kiddos Zone Bogor - Bimbel Terbaik di Bogor",
    description:
      "Bimbingan belajar di Bogor menyediakan bimbingan belajar terbaik untuk anak-anak dengan metode interaktif dan menyenangkan.",
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
      "Bimbingan Belajar di Bogor menyediakan bimbingan belajar terbaik untuk anak-anak dengan metode interaktif dan menyenangkan.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-TN36DG67E8`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TN36DG67E8');
          `}
        </Script>
      </head>
      <body className="font-poppins bg-white">
        <Navbar />
        <FlyingButton />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}