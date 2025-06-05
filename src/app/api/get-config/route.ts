import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import localConfig from '@/config/localConfig';

export async function GET(request: NextRequest) {
  try {
    // Return the imported config (which should be the latest version)
    return NextResponse.json({ 
      success: true, 
      config: localConfig 
    });
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Unknown error',
        fallbackConfig: localConfig // Always provide a fallback
      },
      { status: 500 }
    );
  }
} 