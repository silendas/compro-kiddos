import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Tambahkan ini agar export gambar Next.js tidak error
  },
  /* config options here */
};

export default nextConfig;
