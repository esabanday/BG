import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import clientPromise from '@/lib/mongodb';
import { ShopifyAdapter } from '@/lib/shopify';
import sharp from 'sharp';

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

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 2MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with sharp
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Optimize image to fit within 2MB
    let processedImage = image;
    let quality = 80; // Start with 80% quality

    // If image is too large, resize and compress
    if (metadata.width && metadata.height) {
      // Calculate target dimensions while maintaining aspect ratio
      const maxDimension = 1200; // Reasonable max dimension for web
      let targetWidth = metadata.width;
      let targetHeight = metadata.height;

      if (metadata.width > maxDimension || metadata.height > maxDimension) {
        if (metadata.width > metadata.height) {
          targetWidth = maxDimension;
          targetHeight = Math.round((metadata.height * maxDimension) / metadata.width);
        } else {
          targetHeight = maxDimension;
          targetWidth = Math.round((metadata.width * maxDimension) / metadata.height);
        }
      }

      processedImage = image
        .resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality }); // Convert to JPEG for better compression
    }

    // Create a unique filename using the product name
    const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const uniqueId = uuidv4().slice(0, 8);
    const filename = `${sanitizedName}-${uniqueId}.jpg`; // Always save as jpg for better compression

    // Save to public directory
    const publicDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(publicDir, filename);
    
    // Save processed image
    await processedImage.toFile(filepath);

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
      price: 0,
      image: `https://www.bandayglam.com/uploads/${filename}`,
      colors: ['Default'],
      sizes: ['One Size'],
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