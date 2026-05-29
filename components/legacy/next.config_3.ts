import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

const nextConfig: NextConfig = {
  serverExternalPackages: [
    '@grpc/grpc-js',
    '@opentelemetry/sdk-node',
    '@opentelemetry/configuration',
    '@opentelemetry/exporter-trace-otlp-grpc',
    '@opentelemetry/exporter-logs-otlp-proto',
    '@opentelemetry/otlp-exporter-base',
    '@opentelemetry/otlp-grpc-exporter-base',
    '@opentelemetry/context-async-hooks',
    '@arizeai/openinference-semantic-conventions',
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
};

export default withNextIntl(nextConfig);
