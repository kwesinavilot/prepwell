import { NextResponse } from 'next/server'
import { auth } from "@/services/auth"

const protectedRoutes = ['/dashboard', '/documents', '/jobs', '/practice', '/schedule', '/settings']

export default auth((req) => {
    const isLoggedIn = !!req.auth
    console.log("isLoggedIn: ", isLoggedIn)

    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isPanelPage = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))
    console.log("isPanelPage: ", isPanelPage)

    // redirect to login if not authenticated and trying to access panel pages
    if (!isLoggedIn && isPanelPage) {
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    // redirect to dashboard if authenticated and trying to access auth page or landing page
    if ((isLoggedIn && isAuthPage) || (isLoggedIn && req.nextUrl.pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}