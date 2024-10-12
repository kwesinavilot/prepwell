import { auth} from "@/services/auth";
import { redirect } from 'next/navigation';
import { Inter } from "next/font/google";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SignOut from "@/components/site/panel/SignOut";

import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });

export default async function PanelLayout({ children }) {
    const session = await auth();

    if (!session) {
        console.log('User not authenticated. Redirecting...')
        redirect('/auth')
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="w-full h-screen">
                    <header className="sticky top-0 z-50 w-full -mb-14 flex h-16 bg-white px-10 justify-between">
                        <div className="flex">
                            <Link className="flex items-center hash-tx-color" href="/firstprep">
                                <span className="hidden text-xl font-bold sm:inline-block text-blue-600">
                                    Prepwell
                                </span>
                            </Link>
                        </div>

                        <div className="flex justify-end items-center py-2.5 bg-white">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image || ""} alt="User" />
                                        <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56 mr-10">
                                    <DropdownMenuLabel className="flex flex-col space-y-1">
                                        {session?.user?.name}
                                        <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                                    </DropdownMenuLabel>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem className="cursor-pointer">
                                        <SignOut />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto py-0 px-10">
                        {children}
                    </main>
                </div>
            </body>
        </html>
    );
}