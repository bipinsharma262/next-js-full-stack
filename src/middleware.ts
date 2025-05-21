import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Update publicRoutes to use regex patterns for exact matches
  const publicRoutes = [
    /^\/$/,  // Home
    /^\/admin$/,
    /^\/products(\/\d+)?$/,  // Match products with numeric ID (1+ digits)
    /^\/products\/\d+\/purchase$/,  // Match purchase routes with numeric ID
    /^\/login$/,
    /^\/sign-up$/,
    /^\/api(\/.*)?$/,
    /^\/public(\/.*)?$/
  ];

  // Check against regex patterns instead of simple startsWith
  const isPublicRoute = publicRoutes.some(regex => regex.test(pathname));

  if (!isPublicRoute) {
    //return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
