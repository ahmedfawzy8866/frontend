import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

// Packages that use Node.js native binaries — must never be bundled client-side
const SERVER_ONLY_PACKAGES = [
  '@grpc/grpc-js',
  '@opentelemetry/exporter-trace-otlp-grpc',
  '@opentelemetry/exporter-trace-otlp-http',
  '@opentelemetry/exporter-logs-otlp-http',
  '@opentelemetry/sdk-node',
  '@opentelemetry/sdk-logs',
  '@opentelemetry/sdk-trace-node',
  '@opentelemetry/instrumentation-http',
  '@opentelemetry/instrumentation-express',
  'firebase-admin',
];


const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Prevent Next.js from bundling Node.js-only packages (gRPC, OpenTelemetry)
  serverExternalPackages: [
    '@grpc/grpc-js',
    '@opentelemetry/exporter-trace-otlp-grpc',
    '@opentelemetry/sdk-node',
    'firebase-admin',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: '**.firebasestorage.app' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Stub all server-only packages to empty modules in the browser bundle
      SERVER_ONLY_PACKAGES.forEach(pkg => {
        config.resolve.alias[pkg] = false;
      });
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
