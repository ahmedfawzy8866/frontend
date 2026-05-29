/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    return config;
  },
};

module.exports = nextConfig;
