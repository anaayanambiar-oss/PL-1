import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import StatBanner from "@/components/layout/StatBanner";
import HowItWorks from "@/components/layout/HowItWorks";
import Features from "@/components/layout/Features";
import Curriculum from "@/components/layout/Curriculum";
import AudienceSection from "@/components/layout/AudienceSection";
import CtaSection from "@/components/layout/CtaSection";
import Footer from "@/components/layout/Footer";

// TODO: Testimonials section — placeholder for real user quotes once internal testing is complete.
// Add a <Testimonials /> component between <CtaSection /> and <Footer /> when ready.

export default function Home() {
  return (
    <main className="bg-[#FFFDF7] overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatBanner />
      <HowItWorks />
      <Features />
      <Curriculum />
      <AudienceSection />
      <CtaSection />
      {/* Testimonials — coming after internal testing */}
      <Footer />
    </main>
  );
}
