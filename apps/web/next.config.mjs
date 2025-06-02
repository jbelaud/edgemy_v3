import createNextIntlPlugin from 'next-intl/plugin';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ];
  },
  transpilePackages: ["@workspace/ui"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@workspace/ui/lib/utils.js': resolve(__dirname, '../../packages/ui/src/lib/utils'),
      '@workspace/ui/lib/utils': resolve(__dirname, '../../packages/ui/src/lib/utils'),
    };
    
    // Assurer que les modules du workspace sont correctement résolus
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    
    return config;
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/waitlist',
        permanent: true,
      }
    ];
  }
};

export default withNextIntl(nextConfig);