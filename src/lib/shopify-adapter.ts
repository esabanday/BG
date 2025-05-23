// This is a workaround for the Shopify API export issues
// We re-export the web-api adapter to use it consistently
import '@shopify/shopify-api/adapters/web-api';

// Custom adapter to handle both web and node environments
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-01';

// Create a custom adapter that works in both environments
const customAdapter = {
  fetch: global.fetch,
  Headers: global.Headers,
  Request: global.Request,
  Response: global.Response,
  crypto: require('crypto'),
  base64Encode: (data: string) => Buffer.from(data).toString('base64'),
  base64Decode: (data: string) => Buffer.from(data, 'base64').toString(),
};

// Export a configured shopify instance
export const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  scopes: [
    'read_products',
    'write_products',
    'read_orders',
    'write_orders',
    'read_inventory',
    'write_inventory'
  ],
  hostName: process.env.SHOPIFY_STORE_URL!,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  restResources,
  isCustomStoreApp: true,
  adapter: customAdapter,
});

export const useWebAdapter = true; 