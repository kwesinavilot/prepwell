'use client';

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
    const { data: session } = useSession();

    return (
        <header className="flex justify-end items-center p-4 bg-white border-b">
            <Avatar>
                <AvatarImage src={session?.user?.image || ""} alt="User" />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
        </header>
    );
}