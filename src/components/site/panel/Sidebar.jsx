'use client';

import React, { useState } from 'react';
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
    { name: 'Dashboard', href: '/panel', icon: HomeIcon },
    { name: 'My Documents', href: '/panel/documents', icon: FileTextIcon },
    { name: 'Job Listings', href: '/panel/jobs', icon: BriefcaseIcon },
    { name: 'Practice Sessions', href: '/panel/practice', icon: VideoIcon },
    { name: 'Schedule', href: '/panel/schedule', icon: CalendarIcon },
    { name: 'Settings', href: '/panel/settings', icon: SettingsIcon },
];

export const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div className={cn(
            "flex flex-col h-screen bg-gray-800 text-white transition-all duration-300",
            isCollapsed ? "w-16" : "w-64"
        )}>
            <div className="flex items-center justify-between p-4">
                {!isCollapsed && <span className="text-xl font-bold">Promptwell</span>}
                
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-white hover:bg-gray-700"
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
                                "flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-200 hover:bg-gray-700",
                                pathname === item.href && "bg-gray-700"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {!isCollapsed && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </ScrollArea>
        </div>
    );
}