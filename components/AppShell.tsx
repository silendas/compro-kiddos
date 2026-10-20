"use client";

import { usePathname } from "next/navigation";
import Navbar from "@comp/Navbar";
import Footer from "@comp/Footer";
import FlyingButton from "@comp/FlyingButton";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") || pathname?.startsWith("/artikel/kelola");

  if (isAdminRoute) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <FlyingButton />
      <main>{children}</main>
      <Footer />
    </>
  );
}
