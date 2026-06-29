import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Showcases } from "@/components/sections/Showcases";
import { Team } from "@/components/sections/Team";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { NavBar } from "@/components/ui/NavBar";
import { Footer } from "@/components/ui/Footer";
import { PlanetsBackground } from "@/components/animations/PlanetsBackground";

export default function HomePage() {
  return (
    <>
      <PlanetsBackground />
      <NavBar />
      <main>
        <Hero />
        <Services />
        <Team />
        <Showcases />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
