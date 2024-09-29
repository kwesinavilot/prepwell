import { NextResponse } from 'next/server'
import NextAuth from "next-auth"
import authConfig from "@/services/auth.config"

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    // console.log("isLoggedIn", isLoggedIn)
    const isAuthPage = nextUrl.pathname.startsWith('/auth')
    const isFirstPage = nextUrl.pathname === '/first'

    if (!isLoggedIn) {
        if (!isAuthPage) {
            return NextResponse.redirect(new URL('/auth', nextUrl))
        }
    } else {
        // console.log('Redirecting authenticated user...')
        const authUser = req.auth.user
        // console.log("auth: ", req.auth)

        if (authUser.first_prep === 'NOTSTARTED' && !isFirstPage) {
            // console.log("User hasn't taken first prep. Redirecting...")
            return NextResponse.redirect(new URL('/first', nextUrl))
        }

        if ((isAuthPage || nextUrl.pathname === '/') && authUser.first_prep !== 'NOTSTARTED') {
            // console.log('Authenticated user attempting to access auth, landing or first pages. Redirecting...')
            return NextResponse.redirect(new URL('/dashboard', nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}