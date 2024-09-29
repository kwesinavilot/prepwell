import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback", session, token)
      // append the first prep status to the session
      if (session.user) {
        session.user.first_prep = token.first_prep;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirecting to", url, baseUrl)

      // If it's an absolute URL that starts with the base URL, allow it
      if (url.startsWith(baseUrl)) {
        return url;
      }
      // For other cases, redirect to the base URL
      return baseUrl;
    },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
});


// MIDDLEWARE
import { NextResponse } from 'next/server'
import { auth } from "@/services/auth"

const protectedRoutes = ['/dashboard', '/documents', '/jobs', '/practice', '/schedule', '/settings', '/first']

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};

export default auth((req) => {
    console.log("Auth middleware running...")

    const isLoggedIn = !!req.auth
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isPanelPage = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))

    // Redirect to login if not authenticated and trying to access panel pages
    if (!isLoggedIn && isPanelPage) {
        console.log('Unauthenticated user attempting to access panel. Redirecting...')
        return NextResponse.redirect(new URL('/auth', req.url))
    }

    if (isLoggedIn) {
        console.log('Redirecting authenticated user...')
        const first_prep = req.auth.user?.first_prep

        if (first_prep === 'NOTSTARTED') {
            console.log("User hasn't taken first prep. Redirecting...")
            return NextResponse.redirect(new URL('/first', req.url))
        }

        // Redirect to dashboard if authenticated and trying to access auth, landing or first pages
        if (first_prep !== 'NOTSTARTED' && (isAuthPage || req.nextUrl.pathname === '/' || isFirstPage)) {
            console.log('Authenticated user attempting to access auth, landing or first pages. Redirecting...')
            return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }

    return NextResponse.next()
});