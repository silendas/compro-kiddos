import type { Metadata, Viewport } from "next";
import { Baloo_2, Poppins } from "next/font/google";
import Script from "next/script";
import AppShell from "@comp/AppShell";
import JsonLd from "@comp/JsonLd";
import { AuthProvider } from "@lib/authContext";
import { SITE_CONFIG } from "@data/siteConfig";
import "@style/globals.css";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-2",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Bimbel Kiddos Zone Bogor - Les Calistung & Privat Terbaik di Bogor",
    template: "%s | Bimbel Kiddos Zone Bogor",
  },
  description:
    "Bimbel Kiddos Zone Bogor - Bimbingan belajar & les privat terbaik di Kota Bogor untuk jenjang PraCalis, Calistung anak TK/SD, Matematika, Bahasa Inggris, BTQ Al-Qur'an, dan les privat ke rumah.",
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/Logo_Kiddos.webp", type: "image/webp" },
    ],
    apple: "/assets/Logo_Kiddos.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_CONFIG.name,
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: false,
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "geo.region": "ID-JB",
    "geo.placename": "Kota Bogor",
    "geo.position": "-6.582;106.815",
    ICBM: "-6.582, 106.815",
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
    <html lang="id" className={`${poppins.variable} ${baloo2.variable}`}>
      <body className="bg-white text-gray-900 antialiased selection:bg-amber-200 selection:text-orange-950">
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
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}