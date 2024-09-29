'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    HomeIcon,
    FileTextIcon,
    BriefcaseIcon,
    VideoIcon,
    CalendarIcon,
    SettingsIcon,
    MenuIcon
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'My Documents', href: '/documents', icon: FileTextIcon },
    { name: 'Job Listings', href: '/jobs', icon: BriefcaseIcon },
    { name: 'Practice Sessions', href: '/practice', icon: VideoIcon },
    { name: 'Schedule', href: '/schedule', icon: CalendarIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
];

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div className={cn(
            "flex flex-col h-screen bg-white transition-all duration-300 border-r",
            isCollapsed ? "w-16" : "w-64"
        )}>
            <div className="flex items-center justify-between py-3 pl-6 pr-2 border-b">
                {!isCollapsed && <span className="hidden text-xl font-bold sm:inline-block text-blue-600">Prepwell</span>}
                
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-black hover:bg-gray-200"
                >
                    <MenuIcon className="h-5 w-5" />
                </Button>
            </div>

            <ScrollArea className="flex-1">
                <nav className="space-y-2 p-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-2 rounded-lg px-3 py-2 hover:bg-gray-200",
                                pathname === item.href && "bg-gray-200"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {!isCollapsed && <span className="text-black">{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
        </div>
    );
}