import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;

  // Protect the /profile route
  if (request.nextUrl.pathname.startsWith('/profile')) {
    if (!token) {
      // Redirect unauthenticated users to the login page
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on specific routes to optimize performance
export const config = {
  matcher: ['/profile/:path*'],
};
