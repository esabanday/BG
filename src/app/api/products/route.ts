import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Product, ProductInput } from '@/models/Product';
import shopify from '@/lib/shopify-client';

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

    const session = shopify.session.customAppSession(process.env.SHOPIFY_STORE_URL!);
    const shopifyClient = new shopify.clients.Rest({ session });
    
    const shopifyResponse = await shopifyClient.post({
      path: 'products',
      data: { product: shopifyProduct }
    });

    // Update MongoDB product with Shopify ID
    await db.collection("products").updateOne(
      { _id: result.insertedId },
      { $set: { shopifyId: shopifyResponse.body.product.id.toString() } }
    );
    
    return NextResponse.json({ 
      status: "success", 
      message: "Product created successfully",
      product: {
        ...product,
        _id: result.insertedId,
        shopifyId: shopifyResponse.body.product.id
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