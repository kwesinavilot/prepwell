import Google from "next-auth/providers/google"
import { redirect } from "next/navigation";

export default {
    providers: [Google],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.first_prep = user.first_prep;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.first_prep = token.first_prep;
            return session;
        },
    },
    pages: {
        signIn: "/auth",
    },
    events: {
        async signOut() {
            redirect("/auth");
        },
    },
}