import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Lokasi Cabang (Admin)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KelolaCabangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
