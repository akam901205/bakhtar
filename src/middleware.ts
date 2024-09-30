import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  console.log('[Middleware] Handling request for:', request.nextUrl.pathname);
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('[Middleware] Admin route detected, checking authentication');
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      console.log('[Middleware] No token found');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      if (!(payload as any).isAdmin) {
        console.log('[Middleware] User is not an admin');
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    } catch (error) {
      console.error('[Middleware] Token verification failed:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  console.log('[Middleware] Access allowed');
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}