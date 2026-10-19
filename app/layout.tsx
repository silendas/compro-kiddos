import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@comp/Navbar";
import Footer from "@comp/Footer";
import FlyingButton from "@comp/FlyingButton";
import JsonLd from "@comp/JsonLd";
import { SITE_CONFIG } from "@data/siteConfig";
import "@style/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Bimbel Kiddos Zone - Bimbel & Les Privat Terbaik di Bogor",
    template: "%s | Bimbel Kiddos Zone",
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Bimbel Kiddos Zone Bogor - Bimbel Terbaik di Bogor",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bimbel Kiddos Zone Logo & Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bimbel Kiddos Zone Bogor - Bimbel Terbaik di Bogor",
    description: SITE_CONFIG.description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <JsonLd />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TN36DG67E8"
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