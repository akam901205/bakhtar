import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('[Middleware] Handling request for:', request.nextUrl.pathname);
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('[Middleware] Admin route detected, allowing access');
    return NextResponse.next();
  }

  console.log('[Middleware] Non-admin route, proceeding');
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}