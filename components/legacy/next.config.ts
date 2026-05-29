import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

// Packages that must never be bundled client-side (native binaries / gRPC)
const SERVER_ONLY_PACKAGES = [
  '@grpc/grpc-js',
  '@opentelemetry/exporter-trace-otlp-grpc',
  '@opentelemetry/exporter-trace-otlp-http',
  '@opentelemetry/exporter-logs-otlp-http',
  '@opentelemetry/otlp-transformer',
  '@opentelemetry/sdk-node',
  '@opentelemetry/sdk-logs',
  '@opentelemetry/sdk-trace-node',
  '@opentelemetry/sdk-trace-base',
  '@opentelemetry/instrumentation-http',
  '@opentelemetry/instrumentation-express',
  '@opentelemetry/resources',
  '@arizeai/openinference-semantic-conventions',
  'firebase-admin',
];

const nextConfig: NextConfig = {
  serverExternalPackages: [
    '@grpc/grpc-js',
    '@opentelemetry/exporter-trace-otlp-grpc',
    '@opentelemetry/exporter-trace-otlp-http',
    '@opentelemetry/exporter-logs-otlp-http',
    '@opentelemetry/otlp-transformer',
    '@opentelemetry/sdk-node',
    '@opentelemetry/sdk-logs',
    '@opentelemetry/sdk-trace-node',
    '@opentelemetry/sdk-trace-base',
    '@opentelemetry/instrumentation-http',
    '@opentelemetry/instrumentation-express',
    '@opentelemetry/resources',
    '@arizeai/openinference-semantic-conventions',
    'firebase-admin',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
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
  turbopack: {
    resolveAlias: {
      '@grpc/grpc-js': './src/lib/stubs/empty.js',
      '@opentelemetry/exporter-trace-otlp-grpc': './src/lib/stubs/empty.js',
      '@opentelemetry/exporter-trace-otlp-http': './src/lib/stubs/empty.js',
      '@opentelemetry/exporter-logs-otlp-http': './src/lib/stubs/empty.js',
      '@opentelemetry/sdk-node': './src/lib/stubs/empty.js',
      '@opentelemetry/sdk-logs': './src/lib/stubs/empty.js',
      '@opentelemetry/sdk-trace-node': './src/lib/stubs/empty.js',
      '@opentelemetry/instrumentation-http': './src/lib/stubs/empty.js',
      '@opentelemetry/instrumentation-express': './src/lib/stubs/empty.js',
      'firebase-admin': './src/lib/stubs/empty.js',
    }
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      SERVER_ONLY_PACKAGES.forEach(pkg => {
        config.resolve.alias[pkg] = false;
      });
    }
    config.module = config.module || {};
    config.module.noParse = [
      ...(Array.isArray(config.module.noParse) ? config.module.noParse : []),
      /protobufjs[\\/]src[\\/]util[\\/]inquire/,
    ];
    return config;
  },
};

export default withNextIntl(nextConfig);
