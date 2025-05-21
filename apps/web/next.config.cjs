const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@edgemy/ui'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@edgemy/ui': require.resolve('@edgemy/ui')
    };
    return config;
  }
};

module.exports = withNextIntl(nextConfig); 