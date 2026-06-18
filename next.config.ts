import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack dev output must not share chunks with production builds.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
