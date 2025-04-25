import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-01';
import '@shopify/shopify-api/adapters/node';

if (!process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_API_SECRET || !process.env.SHOPIFY_STORE_URL) {
  throw new Error('Missing Shopify environment variables');
}

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: [
    'read_products',
    'write_products',
    'read_orders',
    'write_orders',
    'read_inventory',
    'write_inventory'
  ],
  hostName: process.env.SHOPIFY_STORE_URL,
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: false,
  restResources
});

export default shopify; 