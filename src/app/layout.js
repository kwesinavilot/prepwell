import { Inter } from "next/font/google";
import "@/styles/globals.css";

import Heading from "@/components/site/Heading";
import Footer from "@/components/site/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prepwell",
  description: "Boost your confidence for interviews and public speaking with the best interview prep and public speaking tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Heading />

        {children}

        <Footer />
      </body>
    </html>
  );
}