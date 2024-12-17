import { NextResponse, NextRequest } from 'next/server';

// Middleware to check if the user is authorized
export async function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1] || req.cookies.get('token')?.value;

  if (!token) {
    // If no token, deny access
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Call the API to verify the token
    const response = await fetch(new URL('/api/verify-token', req.url), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      // Check if the user has the necessary roles or permissions
      const decoded = data.decoded;

      // Check user role (e.g., admin or regular user)
      if (decoded.role === 'admin') {
        // Allow access to admin panel
        return NextResponse.next();
      }

      // Check if user can modify their account
      if (req.url.includes('/account') && decoded.userId === req.url.split('/').pop()) {
        // Allow account modification if the user is modifying their own account
        return NextResponse.next();
      }

      // If the user doesn't have proper permissions, deny access
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    } else {
      // If the token is invalid, redirect to login page
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } catch (error) {
    // If there is an error with the request, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Specify paths where this middleware should apply (if needed)
export const config = {
  matcher: ['/admin', '/'], // Match specific routes
};
