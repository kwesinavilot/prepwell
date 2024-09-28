import { FAQ } from "@/components/site/home/FAQ";
import { Hero } from "@/components/site/home/Hero";
import { Heading } from "@/components/site/home/Heading";
import { Footer } from "@/components/site/home/Footer";
import { Process } from "@/components/site/home/Process";
import { Features } from "@/components/site/home/Features";

export const metadata = {
  title: "Prepwell",
  description: "Boost your confidence for interviews and public speaking with the best interview prep and public speaking tools.",
};

export default function Home() {
  return (
    <>
      <Heading />

      <main className="flex-1">
        <Hero />

        <Process />

        <Features />

        <FAQ />
      </main>

      <Footer />
    </>
  );
}