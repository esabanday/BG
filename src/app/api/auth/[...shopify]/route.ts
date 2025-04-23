import { NextRequest, NextResponse } from 'next/server';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

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
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shop = searchParams.get('shop');
  const code = searchParams.get('code');

  if (!shop || !code) {
    return NextResponse.json({ error: 'Missing shop or code parameter' }, { status: 400 });
  }

  try {
    // Get the access token using the OAuth flow
    const accessToken = await shopify.auth.oauth.requestAccessToken({
      code,
      shop,
    });

    // Store the access token securely
    // You might want to store this in your database
    console.log('Access token:', accessToken);

    // Redirect to the callback URL
    const callbackUrl = new URL('/api/auth/callback', request.url);
    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.json({ 
      error: 'Failed to get access token',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 