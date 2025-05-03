/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  images: {
    domains: ['cdn.shopify.com', 'bandayglam.com'],
  },
  transpilePackages: ['@shopify/shopify-api'],
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = nextConfig; 