import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";
import { StatsBar } from "../components/sections/StatsBar";
import { Process } from "../components/sections/Process";
import { ValueProps } from "../components/sections/ValueProps";
import { Services } from "../components/sections/Services";
import { Pricing } from "../components/sections/Pricing";
import { Testimonials } from "../components/sections/Testimonials";
import { Industries } from "../components/sections/Industries";
import { EngagementTerms } from "../components/sections/EngagementTerms";
import { FAQ } from "../components/sections/FAQ";
import { Contact } from "../components/sections/Contact";
import { Footer } from "../components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />
      <StatsBar />
      <Process />
      <ValueProps />
      <Services />
      <Pricing />
      <Testimonials />
      <Industries />
      <EngagementTerms />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
