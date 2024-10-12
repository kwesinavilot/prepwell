import Google from "next-auth/providers/google"
import { redirect } from "next/navigation";

export default {
    providers: [Google],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.first_prep = user.first_prep;
                token.userID = user.id;
                token.lastUpdated = Date.now();
            }

            // If the first_prep status is updated, update the token
            if (trigger === "update" && session?.first_prep) {
                console.log("First prep status updated:", session.first_prep);
                token.first_prep = session.first_prep;
                token.lastUpdated = Date.now();
            }

            return token;
        },
        async session({ session, token }) {
            session.user.first_prep = token.first_prep;
            session.user.userID = token.userID;
            session.lastUpdated = token.lastUpdated;
            return session;
        },
    },
    pages: {
        signIn: "/auth",
    },
}