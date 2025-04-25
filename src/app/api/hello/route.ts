import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: "Hello! Server is working correctly",
    timestamp: new Date().toISOString()
  });
} 