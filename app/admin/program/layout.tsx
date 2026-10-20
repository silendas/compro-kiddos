import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Program Belajar (Admin)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KelolaProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
