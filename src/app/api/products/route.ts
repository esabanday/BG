import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Product, ProductInput } from '@/models/Product';

// Function to make Shopify API requests
async function shopifyRequest(path: string, method: string = 'GET', data?: any) {
  const response = await fetch(`https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN!
    },
    body: data ? JSON.stringify(data) : undefined
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  return response.json();
}

export async function GET() {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("bandayglam");
    
    const products = await db.collection("products").find({}).toArray();
    
    return NextResponse.json({ 
      status: "success", 
      products 
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to fetch products",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db("bandayglam");
    
    const productData: ProductInput = await request.json();
    
    // Create product in MongoDB
    const product: Product = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection("products").insertOne(product);
    
    // Create product in Shopify
    const shopifyProduct = {
      title: product.name,
      body_html: product.description,
      vendor: 'BandayGlam',
      product_type: 'Apparel',
      status: 'active',
      variants: [
        {
          price: product.price.toString(),
          inventory_management: 'shopify',
          inventory_policy: 'deny',
          inventory_quantity: 100,
          requires_shipping: true
        }
      ],
      options: [
        {
          name: 'Size',
          values: product.sizes
        },
        {
          name: 'Color',
          values: product.colors
        }
      ]
    };

    // Create product in Shopify using direct API call
    const shopifyResponse = await shopifyRequest('products.json', 'POST', { product: shopifyProduct });

    // Update MongoDB product with Shopify ID
    await db.collection("products").updateOne(
      { _id: result.insertedId },
      { $set: { shopifyId: shopifyResponse.product.id.toString() } }
    );
    
    return NextResponse.json({ 
      status: "success", 
      message: "Product created successfully",
      product: {
        ...product,
        _id: result.insertedId,
        shopifyId: shopifyResponse.product.id
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to create product",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 