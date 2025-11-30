import DashboardSection from "@/components/landing/DashboardSection";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection/FeaturesSection";
import TestimonilaSection from "@/components/landing/TestimonialSection";
import CTASection from "@/components/landing/CTASection";
import FreeSection from "@/components/landing/FreeSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <DashboardSection />

      <FeaturesSection />

      <FreeSection />
      <TestimonilaSection />

      <CTASection />

      <div className=" fixed bottom-4 left-4 max-sm:left-1/2 max-sm:hidden z-20">
        <a
          href="https://www.producthunt.com/products/1beatclub?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-1beatclub"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=683983&theme=dark&t=1764508352133"
            alt="1BeatClub - Where&#0032;everyone’s&#0032;vibe&#0032;becomes&#0032;the&#0032;playlist | Product Hunt"
            unoptimized
            width={200}
            height={200}
            className=" max-sm:w-[300px]"
          />
        </a>
      </div>
    </div>
  );
}
