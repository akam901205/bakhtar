import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

export function middleware(request: NextRequest) {
  console.log('[Middleware] Handling request for:', request.nextUrl.pathname);
  
  const token = request.cookies.get('token')?.value
  console.log('[Middleware] Token present:', !!token);

  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('[Middleware] Checking admin route');
    if (!token) {
      console.log('[Middleware] No token, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      const decoded = verify(token, process.env.JWT_SECRET as string) as { userId: number, email: string, isAdmin: boolean }
      console.log('[Middleware] Token decoded:', JSON.stringify(decoded));
      
      if (!decoded.isAdmin) {
        console.log('[Middleware] User is not admin, redirecting to unauthorized');
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
      
      console.log('[Middleware] Admin access granted');
      return NextResponse.next()
    } catch (error) {
      console.error('[Middleware] Error verifying token:', error)
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  console.log('[Middleware] Allowing request to proceed');
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}