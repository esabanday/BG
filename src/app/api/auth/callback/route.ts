import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Here you would typically store the access token in your database
    // For now, we'll just return a success message
    return NextResponse.json({ 
      status: "success", 
      message: "Successfully authenticated with Shopify",
      // You might want to redirect to your app's main page
      redirect: "/"
    });
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json({ 
      status: "error",
      message: "Failed to complete authentication",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 