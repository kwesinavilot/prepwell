import { FAQ } from "@/components/site/home/FAQ";
import { Hero } from "@/components/site/home/Hero";
import {Heading} from "@/components/site/home/Heading";
import {Footer} from "@/components/site/home/Footer";
import {Process} from "@/components/site/home/Process";

export default function Home() {
  return (
    <>
      <Heading />

      <main className="flex-1">
        <Hero />

        <Process />

        <FAQ />
      </main>

      <Footer />
    </>
  );
}