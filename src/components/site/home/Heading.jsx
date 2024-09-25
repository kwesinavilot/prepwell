import React from "react"
import Link from "next/link";

export const Heading = () => (
    <header className="sticky top-0 z-50 w-full -mb-14 flex h-16 border-b bg-white px-10 justify-between">
        <div className="mr-4 hidden md:flex ">
            <Link className="mr-6 flex items-center space-x-2 hash-tx-color" href="/">
                <span className="hidden text-xl font-bold sm:inline-block text-blue-600">
                    Prepwell
                </span>
            </Link>
        </div>

        <nav className="flex items-center text-sm gap-2">
            <Link className="font-semibold text-sm border border-transparent hover:border hover:border-slate-200 inline-flex justify-center items-center gap-2 dark:hover:border-slate-800 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800 text-slate-600 dark:text-slate-300 rounded-3xl py-2.5 px-5" href="#">Launch Post</Link>
            <Link className="font-semibold text-sm border border-transparent hover:border hover:border-slate-200 inline-flex justify-center items-center gap-2 dark:hover:border-slate-800 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800 text-slate-600 dark:text-slate-300 rounded-3xl py-2.5 px-5" href="#">Demo</Link>
            <Link href="#" className="font-semibold text-sm border border-transparent hover:border hover:border-slate-200 inline-flex justify-center items-center gap-2 dark:hover:border-slate-800 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 focus:dark:ring-offset-slate-800 text-slate-600 dark:text-slate-300 rounded-3xl py-2.5 px-5">Other Projects</Link>
        </nav>

        <nav className="flex items-center gap-3">
            <Link rel="noreferrer" className="text-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2" href="/auth">
                Sign In
            </Link>

            <Link className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-600/90 h-10 px-4 py-2" href="/auth">Get Started</Link>
        </nav>
    </header>
);