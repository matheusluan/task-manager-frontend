import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
    process.env.JWT_SECRET!
);

const publicRoutes = ['/', '/register'];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;


    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    const token = req.cookies.get('jwt')?.value;
    const isPublicRoute = publicRoutes.includes(pathname);


    if (!token) {
        if (!isPublicRoute)
            return NextResponse.redirect(new URL('/login', req.url));

        return NextResponse.next();
    }

    try {
        await jwtVerify(token, secret);
    } catch {
        const res = NextResponse.redirect(new URL('/', req.url));
        res.cookies.delete('jwt');
        return res;
    }

    if (isPublicRoute)
        return NextResponse.redirect(new URL('/user', req.url));


    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/register', '/user', '/tasks/:path*'],
};
