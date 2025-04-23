import { NextResponse } from 'next/server';
import shopify from '@/lib/shopify-client';

export async function GET() {
  try {
    const client = new shopify.clients.Rest({
      session: {
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        shop: process.env.SHOPIFY_STORE_URL,
      },
    });

    // Test the connection by getting shop info
    const response = await client.get({
      path: 'shop',
    });

    return NextResponse.json({ 
      status: "success", 
      message: "Successfully connected to Shopify",
      shop: response.body.shop
    });
  } catch (error) {
    console.error('Shopify connection error:', error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to connect to Shopify",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 