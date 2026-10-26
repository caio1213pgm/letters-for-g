import CTA from "@/components/ui/landingPage/CTA";
import Features from "@/components/ui/landingPage/Features";
import Hero from "@/components/ui/landingPage/Hero";
import HowItWorks from "@/components/ui/landingPage/HowItWorks";
import Story from "@/components/ui/landingPage/Story";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Hero />
      <HowItWorks />
      <Story />
      <Features />
      <CTA />
    </main>
  );
}
