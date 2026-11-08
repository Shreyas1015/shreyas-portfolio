import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Cursor, Loader, Menu } from "@/components/chrome";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Motion } from "@/components/motion";
import { OpenSource } from "@/components/open-source";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <>
      <Cursor />
      <Loader />
      <Menu />
      <Hero />
      <main>
        <About />
        <OpenSource />
        <Experience />
        <Stack />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
