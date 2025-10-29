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

      <FreeSection/>
      <TestimonilaSection/>

      <CTASection/>

        <div className=" fixed bottom-4 left-4 max-sm:left-1/2 max-sm:hidden z-20">
          <a href="https://peerlist.io/lokeshs/project/1beatclub" target="_blank" rel="noreferrer" >
				<Image
					src="https://peerlist.io/api/v1/projects/embed/PRJHKKDNG8KKB6K7KFQKOKN9KAAL98?showUpvote=false&theme=dark"
					alt="1Beatclub"
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
