import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Permite abrir o servidor de dev pelo IP da rede (ex.: no celular)
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
