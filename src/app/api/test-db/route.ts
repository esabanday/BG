import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const client = await clientPromise;
    const db = client.db("bandayglam");
    
    // Test the connection
    await db.command({ ping: 1 });
    
    return NextResponse.json({ 
      status: "success", 
      message: "Successfully connected to MongoDB" 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      status: "error", 
      message: "Failed to connect to MongoDB",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 