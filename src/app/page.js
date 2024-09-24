import { FAQ } from "@/components/site/FAQ";
import Hero from "@/components/site/Hero";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <FAQ />
      
      <section>
        <h1>Content</h1>
      </section>
    </main>
  );
}