import { auth, signOut } from "@/services/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SignOut from "./SignOut";

export default async function Header() {
    const session = await auth()

    return (
        <header className="flex justify-end items-center py-2.5 pr-6 bg-white border-b">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src={session?.user?.image || ""} alt="User" />
                        <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 mr-6">
                    <DropdownMenuLabel className="flex flex-col space-y-1">
                        {session?.user?.name}
                        <span className="text-xs text-muted-foreground">{session?.user?.email}</span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer">
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="cursor-pointer">
                        <SignOut />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}