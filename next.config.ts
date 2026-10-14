import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Force Turbopack à utiliser ce dossier comme racine du projet
  // (évite l'avertissement si un autre package-lock.json existe plus haut, ex. C:\Users\OMEN).
  turbopack: {
    root: process.cwd(),
  },
  // Autorise l'ouverture du site en développement depuis l'adresse réseau locale.
  allowedDevOrigins: ["172.22.224.1", "localhost", "127.0.0.1"],
};

export default nextConfig;
