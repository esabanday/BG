import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.SHOPIFY_API_SECRET || !process.env.SHOPIFY_STORE_URL) {
      throw new Error('Missing required environment variables');
    }

    console.log('Making request to:', `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/graphql.json`);
    console.log('Using token:', process.env.SHOPIFY_API_SECRET.substring(0, 10) + '...');

    // Make a direct API call to test the connection
    const response = await fetch(`https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_API_SECRET,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          shop {
            name
            id
            myshopifyDomain
          }
        }`
      })
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || 'Failed to get shop data');
    }

    return NextResponse.json({ 
      status: "success", 
      message: "Successfully connected to Shopify",
      shop: data.data.shop
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