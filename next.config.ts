import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Static HTML export — used for Cloudflare Pages (and similar static hosts) */
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
