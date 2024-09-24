import { FAQ } from "@/components/site/home/FAQ";
import { Hero } from "@/components/site/home/Hero";
import {Heading} from "@/components/site/home/Heading";
import {Footer} from "@/components/site/home/Footer";

export default function Home() {
  return (
    <>
      <Heading />

      <main className="flex-1">
        <Hero />

        <FAQ />

        <section>
          <h1>Content</h1>
        </section>
      </main>

      <Footer />
    </>
  );
}