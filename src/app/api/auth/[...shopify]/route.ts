import { NextRequest, NextResponse } from 'next/server';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-01';
import { Node } from '@shopify/shopify-api/runtime/node';
import crypto from 'crypto';

const shopify = shopifyApi({
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
  runtime: Node,
});

export async function GET(request: NextRequest) {
  console.log('Auth route hit');
  console.log('Full URL:', request.url);
  
  const searchParams = request.nextUrl.searchParams;
  console.log('All search params:', Object.fromEntries(searchParams));
  
  const shop = searchParams.get('shop');
  const hmac = searchParams.get('hmac');
  const timestamp = searchParams.get('timestamp');

  console.log('Shop:', shop);
  console.log('HMAC:', hmac);
  console.log('Timestamp:', timestamp);

  // Step 1: Verify the installation request
  if (!shop || !hmac || !timestamp) {
    console.log('Missing required parameters');
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  // Verify HMAC
  const queryString = Object.entries(Object.fromEntries(searchParams))
    .filter(([key]) => key !== 'hmac')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  console.log('Query string for HMAC:', queryString);

  const generatedHash = crypto
    .createHmac('sha256', process.env.SHOPIFY_API_SECRET as string)
    .update(queryString)
    .digest('hex');

  console.log('Generated HMAC:', generatedHash);
  console.log('Received HMAC:', hmac);

  if (generatedHash !== hmac) {
    console.log('HMAC verification failed');
    return NextResponse.json({ error: 'Invalid HMAC' }, { status: 401 });
  }

  // Step 2: Request authorization code
  const scopes = [
    'read_products',
    'write_products',
    'read_orders',
    'write_orders',
    'read_inventory',
    'write_inventory'
  ].join(',');

  const redirectUri = 'http://localhost:3000/api/auth/callback';
  const nonce = crypto.randomBytes(16).toString('hex');

  console.log('Redirect URI:', redirectUri);
  console.log('Nonce:', nonce);

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${
    process.env.SHOPIFY_API_KEY
  }&scope=${scopes}&redirect_uri=${redirectUri}&state=${nonce}`;

  console.log('Auth URL:', authUrl);

  return NextResponse.redirect(authUrl);
} 