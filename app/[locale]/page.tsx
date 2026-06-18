import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Showcases } from "@/components/sections/Showcases";
import { Team } from "@/components/sections/Team";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { NavBar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Services />
        <Showcases />
        <Team />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
