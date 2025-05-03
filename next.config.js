/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        net: false,
        tls: false,
      };
    }

    // Handle Node.js built-in modules
    config.resolve.alias = {
      ...config.resolve.alias,
      crypto: require.resolve('crypto-browserify'),
    };

    // Aggressive Shopify API handling
    // Directly map all "@shopify/shopify-api/runtime/node" imports
    config.resolve.alias['@shopify/shopify-api/runtime/node'] = false;

    // Add a resolver plugin to handle problematic modules
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push({
      apply: (resolver) => {
        resolver.hooks.resolve.tapAsync(
          'CustomResolverPlugin',
          (request, resolveContext, callback) => {
            if (request.request && request.request.includes('@shopify/shopify-api/runtime/node')) {
              // Resolve to an empty module
              const path = require('path');
              const fs = require('fs');
              
              // Create empty module that exports nothing
              const emptyModulePath = path.resolve(__dirname, 'empty-module.js');
              if (!fs.existsSync(emptyModulePath)) {
                fs.writeFileSync(emptyModulePath, 'module.exports = {};');
              }
              
              const obj = {
                ...request,
                request: emptyModulePath,
              };
              resolver.doResolve(resolver.hooks.resolve, obj, null, resolveContext, callback);
              return;
            }
            callback();
          }
        );
      },
    });
    
    // Handle binary files
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
  images: {
    domains: ['cdn.shopify.com', 'bandayglam.com'],
  },
  experimental: {
    esmExternals: 'loose'
  }
};

module.exports = nextConfig; 