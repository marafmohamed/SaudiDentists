import { NextResponse, NextRequest } from 'next/server';

// Helper function to validate tokens via backend API
async function validateToken(token: string, role: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BACK_URL;
        const endpoint = role === 'admin' ? `${baseUrl}/api/auth/verifyTokenAdmin` : `${baseUrl}/api/auth/verifyTokenDentist`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data.isValid; // Ensure the backend returns an `isValid` field
    } catch (error) {
        console.error('Error validating token:', error);
        return false;
    }
}

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const { pathname } = url;

    // Admin Panel validation
    if (pathname.startsWith('/AdminPanel')) {
        const adminToken = req.cookies.get('admin');
        if (!adminToken || !(await validateToken(adminToken.value, 'admin'))) {
            url.pathname = '/Adminlogin'; // Redirect to Adminlogin
            return NextResponse.redirect(new URL("/Adminlogin", req.url));
        }
    }

    // User UpdateProfile validation
    if (pathname.startsWith('/UpdateProfile')) {
        const userToken = req.cookies.get('token');
        if (!userToken || !(await validateToken(userToken.value, 'user'))) {
            url.pathname = '/Login'; // Redirect to Login
            return NextResponse.redirect(new URL("/Login", req.url));
        }
    }

    // Proceed if no validation is required or token is valid
    return NextResponse.next();
}

// Apply the middleware to specified routes
export const config = {
    matcher: ['/AdminPanel/:path*', '/UpdateProfile'], // Match routes for AdminPanel and UpdateProfile
};
