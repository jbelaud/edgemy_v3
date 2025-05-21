import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/api/:path*',
      },
    ];
  },
  transpilePackages: ["@workspace/ui"],
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