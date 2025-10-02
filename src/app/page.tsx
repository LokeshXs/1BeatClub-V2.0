import DashboardSection from "@/components/landing/DashboardSection";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonilaSection from "@/components/landing/TestimonialSection";
import CTASection from "@/components/landing/CTASection";
import FreeSection from "@/components/landing/FreeSection";

export default function Home() {
  return (
    <div>
      <HeroSection />

       <DashboardSection />

      <FeaturesSection />

      <FreeSection/>
      <TestimonilaSection/>

      <CTASection/>
    </div>
  );
}
