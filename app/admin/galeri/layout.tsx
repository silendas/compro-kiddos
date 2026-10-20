import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Galeri Foto (Admin)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KelolaGaleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
