import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import clientPromise from '@/lib/mongodb';
import { ShopifyAdapter } from '@/lib/shopify';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    
    if (!file || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename using the product name
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const uniqueId = uuidv4().slice(0, 8);
    const extension = file.name.split('.').pop();
    const filename = `${sanitizedName}-${uniqueId}.${extension}`;

    // Save to public directory
    const publicDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(publicDir, filename);
    
    await writeFile(filepath, buffer);

    // Save to MongoDB
    const client = await clientPromise;
    const db = client.db();
    const product = {
      name,
      description,
      image: `/uploads/${filename}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').insertOne(product);

    // Create product in Shopify
    const shopifyProduct = ShopifyAdapter.toShopify({
      name,
      description,
      price: 0, // You might want to add a price field to the form
      image: `/uploads/${filename}`,
      colors: ['Default'], // Adding a default color option
      sizes: ['One Size'], // Adding a default size option
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Make API call to Shopify
    const shopifyUrl = `https://${process.env.SHOPIFY_STORE_URL}/admin/api/2024-01/products.json`;
    console.log('Making request to:', shopifyUrl);
    console.log('Shopify Product Data:', shopifyProduct);
    
    try {
      const shopifyResponse = await fetch(shopifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN!
        },
        body: JSON.stringify({ product: shopifyProduct })
      });

      if (!shopifyResponse.ok) {
        const errorData = await shopifyResponse.text();
        console.error('Shopify API Error:', {
          status: shopifyResponse.status,
          statusText: shopifyResponse.statusText,
          error: errorData
        });
        throw new Error(`Failed to create product in Shopify: ${errorData}`);
      }

      const shopifyData = await shopifyResponse.json();
      console.log('Shopify Response:', shopifyData);

      // Return the file path and product data
      return NextResponse.json({
        success: true,
        filename: `/uploads/${filename}`,
        product: {
          id: result.insertedId,
          ...product,
          shopifyId: shopifyData.product.id
        }
      });
    } catch (error) {
      console.error('Shopify API Error:', error);
      // Still return success for MongoDB and file upload
      return NextResponse.json({
        success: true,
        filename: `/uploads/${filename}`,
        product: {
          id: result.insertedId,
          ...product
        },
        shopifyError: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 