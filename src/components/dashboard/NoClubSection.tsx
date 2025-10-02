import { cn } from "@/lib/utils";
import { DotPattern } from "../ui/backgrounds/DotPattern";
import CreateFirstClubButton from "./CreateFirstClubButton";
import Image from "next/image";
import ClubCard from "../common/ClubCard";
import { Marquee } from "../ui/Marquee";

export default function NoClubSection() {
  return (
    <div className="  relative flex min-h-[600px]  w-full flex-col items-center justify-center overflow-hidden  ">
      <CreateFirstClubButton />

      {/* <div className=" mt-20 relative max-w-5xl mx-auto">
        <p className=" text-center text-subtext mb-4">Explore & Get Inspired to Create Yours</p>
        <Marquee className="[--duration:120s] bg-transparent " pauseOnHover>
          {new Array(10).fill(0).map((_, idx) => (
            <ClubCard key={idx} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div> */}
    </div>
  );
}
