import { Sidebar } from '@/components/site/panel/Sidebar';
import Header from '@/components/site/panel/Header';

import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function PanelLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex h-screen">
                    <Sidebar />

                    <section className="flex flex-col flex-1 overflow-hidden">
                        <Header />

                        <main className="flex-1 overflow-auto p-6">
                            {children}
                        </main>
                    </section>
                </div>
            </body>
        </html>
    );
}