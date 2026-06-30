import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Tambahkan konfigurasi images di dalam sini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**', // Mengizinkan semua gambar thumbnail dari youtube
      },
    ],
  },
};

export default nextConfig;
