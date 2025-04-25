import { NextResponse } from 'next/server';

export async function GET() {
  console.log('Test route hit');
  return NextResponse.json({ 
    status: "success", 
    message: "Test route working" 
  });
} 