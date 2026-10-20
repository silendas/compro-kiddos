import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Guru & Tutor (Admin)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KelolaGuruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
