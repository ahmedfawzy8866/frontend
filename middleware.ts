import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Serverless Edge Middleware intercepting all inbound webhook arrays
 * checking payload credentials to guarantee database write security integrity.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    const inboundSecretHeader = request.headers.get('X-SBR-SECRET-KEY');
    const systemSecureToken = process.env.SBR_SECRET_KEY;

    if (!inboundSecretHeader || inboundSecretHeader !== systemSecureToken) {
      return new NextResponse(
        JSON.stringify({ success: false, message: "Security Integrity Refused. Access Blocked." }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
  }
  return NextResponse.next();
}

export const config = { matcher: '/api/:path*' };
