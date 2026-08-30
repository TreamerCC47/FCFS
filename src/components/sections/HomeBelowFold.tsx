import { StatsBar } from "./StatsBar";
import { Process } from "./Process";
import { ValueProps } from "./ValueProps";
import { Services } from "./Services";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { Industries } from "./Industries";
import { EngagementTerms } from "./EngagementTerms";
import { FAQ } from "./FAQ";
import { Contact } from "./Contact";
import { Footer } from "../layout/Footer";

export function HomeBelowFold() {
  return (
    <>
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
    </>
  );
}