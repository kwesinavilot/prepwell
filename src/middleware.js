import { NextResponse } from 'next/server'
import NextAuth from "next-auth"
import authConfig from "@/services/auth.config"

export const { auth } = NextAuth(authConfig)

const protectedRoutes = ['/dashboard', '/documents', '/jobs', '/practice', '/schedule', '/settings', '/firstprep']

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    console.log("isLoggedIn", isLoggedIn);
    const isAuthPage = nextUrl.pathname.startsWith('/auth');
    const isFirstPage = nextUrl.pathname === '/firstprep';
    const isPanelPage = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

    if (!isLoggedIn && isPanelPage) {
        console.log('Redirecting unauthenticated user to auth...');
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    if (isLoggedIn) {
        console.log('Redirecting authenticated user...')
        const first_prep = req.auth.user?.first_prep
        console.log('first_prep: ', first_prep)

        if (first_prep === 'NOTSTARTED' && !isFirstPage) {
            console.log("User hasn't taken first prep. Redirecting...")
            return NextResponse.redirect(new URL('/firstprep', nextUrl))
        } else if (first_prep === 'MIDWAY' && nextUrl.pathname !== '/firstprep/interview') {
            console.log("The user is midway. Redirecting...")
            return NextResponse.redirect(new URL('/firstprep/interview', nextUrl))
        }

        if ((isAuthPage || nextUrl.pathname === '/') && first_prep !== 'NOTSTARTED') {
            console.log('Authenticated user attempting to access auth, landing or first pages. Redirecting...')
            return NextResponse.redirect(new URL('/dashboard', nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}