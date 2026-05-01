import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/toolzonex",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
