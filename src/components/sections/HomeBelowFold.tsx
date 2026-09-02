import { Process } from "./Process";
import { ValueProps } from "./ValueProps";
import { Services } from "./Services";
import { Pricing } from "./Pricing";
import { Industries } from "./Industries";
import { EngagementTerms } from "./EngagementTerms";
import { FAQ } from "./FAQ";
import { Contact } from "./Contact";
import { Footer } from "../layout/Footer";

export function HomeBelowFold() {
  return (
    <>
      <ValueProps />
      <Services />
      <Pricing />
      <Process />
      <EngagementTerms />
      <Industries />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}