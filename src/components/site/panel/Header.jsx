// 'use client';

// import { useSession } from "next-auth/react";
import { auth } from "@/services/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function Header(){
    const session = await auth()

    return (
        <header className="flex justify-end items-center p-4 bg-white border-b">
            <Avatar>
                <AvatarImage src={session?.user?.image || ""} alt="User" />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
        </header>
    );
}