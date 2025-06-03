const createNextIntlPlugin = require('next-intl/plugin');
const { resolve } = require('path');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // !! WARN !!
  // Force ignore TypeScript and ESLint errors for deployment
  // !! WARN !!
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
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
    
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/early-access',
        permanent: true,
      },
      {
        source: '/fr',
        destination: '/early-access',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/early-access',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/waitlist',
        permanent: true,
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig); 