import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const roleName = token?.roleName as string
     // Check if the user is authenticated
     if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If authenticated user is trying to access login or register page, redirect to dashboard
    if (['/', '/login', '/register'].includes(url.pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If authenticated user is trying to access admin pages but is not an admin, redirect to dashboard
    if (url.pathname.startsWith('/admin') && roleName !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If authenticated user is an admin and trying to access admin pages, allow the request
    if (url.pathname.startsWith('/admin') && roleName === 'admin') {
        return NextResponse.next();
    }

    // Allow all other requests
    return NextResponse.next();
    // console.log(roleName)

}

export const config = {
    matcher: [
        // Match all routes except the ones that start with /login, /register, and api, and the static folder
        "/((?!api|_next/static|_next/image|favicon.ico|login|register|^/$).*)",
    ],
};
