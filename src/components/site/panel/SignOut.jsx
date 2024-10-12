import { signOut } from "@/services/auth";

async function handleSignOut() {
    "use server"
    console.log("Signing out...")
    await signOut({redirectTo: "/auth"});
}

export default async function SignOut() {

    return (
        <form action={handleSignOut} className="w-full p-0 m-0">
            <button type="submit" className="w-full text-left">Log Out</button>
        </form>
    );
}