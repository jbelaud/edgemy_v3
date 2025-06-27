import createNextIntlPlugin from 'next-intl/plugin';
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/:path*`,
      },
    ];
  },
  transpilePackages: ["@workspace/ui"],
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@workspace/ui/lib/utils.js': resolve(__dirname, '../../packages/ui/src/lib/utils'),
      '@workspace/ui/lib/utils': resolve(__dirname, '../../packages/ui/src/lib/utils'),
    };
    
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };

    // Add Prisma plugin for monorepo support on Vercel
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    
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

export default withNextIntl(nextConfig); 