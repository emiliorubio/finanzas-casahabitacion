import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permitimos que tu dispositivo local descargue el JavaScript de desarrollo
  allowedDevOrigins: ['192.168.1.19'],
};

export default nextConfig;