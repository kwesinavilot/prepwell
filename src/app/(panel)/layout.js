import { SessionProvider } from "next-auth/react"
import { Sidebar } from '@/components/site/panel/Sidebar';
import { Header } from '@/components/site/panel/Header';

import "@/styles/globals.css";

export default async function Layout({ children }) {
    return (
        <SessionProvider>
            <div className="flex h-screen">
                <Sidebar />

                <section className="flex flex-col flex-1 overflow-hidden">
                    <Header />

                    <main className="flex-1 overflow-auto p-6">
                        {children}
                    </main>
                </section>
            </div>
        </SessionProvider>
    );
}