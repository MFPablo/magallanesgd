import { Hero } from "@/components/landing/Hero";
import { PortfolioPreview } from "@/components/landing/PortfolioPreview";
import { Services } from "@/components/landing/Services";
import { Clients } from "@/components/landing/Clients";
import { ContactCTA } from "@/components/landing/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioPreview />
      <Services />
      <Clients />
      <ContactCTA />
    </>
  );
}
