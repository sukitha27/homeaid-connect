import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturedProjectsSection from "@/components/home/FeaturedProjectsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <FeaturedProjectsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
