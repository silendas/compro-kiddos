import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Review (Admin)",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KelolaReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
