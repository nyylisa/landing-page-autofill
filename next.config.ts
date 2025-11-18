import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ⚡ prevents ESLint from running on Vercel build
  },
};

export default nextConfig;
