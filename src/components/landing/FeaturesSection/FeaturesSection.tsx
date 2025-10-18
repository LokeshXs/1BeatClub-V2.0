"use client";

import { PartyPopper, Dumbbell, BusFront, Users } from "lucide-react";
import Image from "next/image";
import { BentoCard, BentoGrid } from "../../ui/BentoGrid";
import { AnimatedList } from "../../ui/AnimatedList";
import SongCardHeroSection from "../../common/SongCardHeroSection";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";
import {
  IconPointerFilled,
} from "@tabler/icons-react";
import QRCode from "react-qrcode-logo";
import animationData from "@/../public/assets/lottie/music-wave.json";
import FourthBentoCard from "./FourthBentoCard";


const songs = [
  {
    id: 1,
    songTitle:
      "Saiyaara (1980) Ft. Kishore Kumar full song (Old version) Old is Gold with a New Voice!",
    user_id: "user_30vJXXzKlEI85ds59huwDDn3q1w",
    thumbnail: "https://i.ytimg.com/vi/fuY2BGi2hAM/mqdefault.jpg",
    highResThumbnail: "https://i.ytimg.com/vi/fuY2BGi2hAM/maxresdefault.jpg",
    link: "https://youtu.be/fuY2BGi2hAM?si=wHrQJ3rp9-sOEqKH",
    clubId: "c25b133d-174a-4773-bfdf-54bcddaae1d4",
    videoId: "fuY2BGi2hAM",
    votes: [],
  },
  {
    id: 2,
    songTitle:
      "Don Toliver - Lose My Mind (feat. Doja Cat) [From F1® The Movie] [Official Audio]",
    user_id: "user_30vJXXzKlEI85ds59huwDDn3q1w",
    thumbnail: "https://i.ytimg.com/vi/VJxppgsHjF8/mqdefault.jpg",
    highResThumbnail: "https://i.ytimg.com/vi/VJxppgsHjF8/maxresdefault.jpg",
    link: "https://youtu.be/VJxppgsHjF8?si=Z7-0ZTt1asAwyFiG",
    clubId: "c25b133d-174a-4773-bfdf-54bcddaae1d4",
    videoId: "VJxppgsHjF8",
    votes: [],
  },
  {
    id: 3,
    songTitle:
      "For A Reason (Official Video) Karan Aujla | Tania  | Ikky | Latest Punjabi Songs 2025",
    user_id: "user_30vJXXzKlEI85ds59huwDDn3q1w",
    thumbnail: "https://i.ytimg.com/vi/-YlmnPh-6rE/mqdefault.jpg",
    highResThumbnail: "https://i.ytimg.com/vi/-YlmnPh-6rE/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=-YlmnPh-6rE&list=RD-YlmnPh-6rE&start_radio=1",
    clubId: "c25b133d-174a-4773-bfdf-54bcddaae1d4",
    videoId: "VJxppgsHjF8",
    votes: [],
  },
  {
    id: 4,
    songTitle: "One Direction - Steal My Girl",
    user_id: "user_30vJXXzKlEI85ds59huwDDn3q1w",
    thumbnail: "https://i.ytimg.com/vi/UpsKGvPjAgw/mqdefault.jpg",
    highResThumbnail: "https://i.ytimg.com/vi/UpsKGvPjAgw/maxresdefault.jpg",
    link: "https://youtu.be/UpsKGvPjAgw?si=3Y7gENoNSdYhZABZ",
    clubId: "c25b133d-174a-4773-bfdf-54bcddaae1d4",
    videoId: "VJxppgsHjF8",
    votes: [],
  },
  {
    id: 5,
    songTitle:
      "OneRepublic - I Ain’t Worried (From “Top Gun: Maverick”) [Official Music Video]",
    user_id: "user_30vJXXzKlEI85ds59huwDDn3q1w",
    thumbnail: "https://i.ytimg.com/vi/mNEUkkoUoIA/mqdefault.jpg",
    highResThumbnail: "https://i.ytimg.com/vi/mNEUkkoUoIA/maxresdefault.jpg",
    link: "https://youtu.be/mNEUkkoUoIA?si=O6sR4t5JU-r5FWY9",
    clubId: "c25b133d-174a-4773-bfdf-54bcddaae1d4",
    videoId: "VJxppgsHjF8",
    votes: [],
  },
];

const InviteCard = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <div className="py-2 px-4 flex justify-between  items-center gap-4 inset-shadow-custom-hover rounded-lg w-full backdrop-blur-md ">
      <div className="flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-gradient-to-br from-gradient-start to-gradient-end">
            CN
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm">ShadCn</p>
          <p className="text-xs text-neutral-400">shadcn@21</p>
        </div>
      </div>

      <div>
        <Button
          size="sm"
          className={cn(
            "bg-gradient-to-r from-gradient-start via-gradient-via to-gradient-end bg-[length:200%_100%] bg-right cursor-pointer flex items-center group hover:bg-center transition-all duration-500 mx-auto text-sm min-w-[80px]",
            {
              "bg-[length:100%_100%]": isActive,
            }
          )}
        >
          invite
        </Button>
      </div>
    </div>
  );
};

const features = [
  {
    Icon: PartyPopper,
    name: "Vote. Play. Repeat",
    description:
      "Share songs, cheer for your favorites, and let the best beats take over the room.",
    href: "/sign-in",
    cta: "Try Now",
    className: "col-span-3 lg:col-span-1 bg-primary",
    background: (
      <div className=" w-full h-full  absolute bg-radial-[200%_100%_at_50%_100%] from-gradient-start/20 top-0 left-0 ">
        <AnimatedList className="absolute   right-0 top-4 h-[300px] w-full  border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-90 ">
          {songs.map((song, index) => (
            <div
              key={song.songTitle}
              className={cn(" w-[500px]  ", {
                "translate-x-[100px]": index % 2 === 0,
                "-translate-x-[200px]": index % 2 !== 0,
              })}
            >
              <SongCardHeroSection
                song={{
                  id: song.id,
                  songTitle: song.songTitle,
                  user_id: "user_30vJXXzKlEI85ds59huwDDn3q1w",
                  thumbnail: song.thumbnail,
                  highResThumbnail: song.highResThumbnail,
                  link: "https://youtu.be/fuY2BGi2hAM?si=wHrQJ3rp9-sOEqKH",
                  clubId: "c25b133d-174a-4773-bfdf-54bcddaae1d4",
                  videoId: "fuY2BGi2hAM",
                  votes: [],
                }}
                isSongVoted={true}
              />
            </div>
          ))}
        </AnimatedList>
      </div>
    ),
  },
  {
    Icon: Dumbbell,
    name: "Perfect for Every Occasion",
    description:
      "From house parties to gym sessions, weddings to casual hangouts—set the mood with playlists everyone helps create.",
    href: "/sign-in",
    cta: "Try Now",
    className: "col-span-3 lg:col-span-2 bg-terniary",
    background: (
      <div className=" absolute top-0 left-0 bg-radial-[200%_100%_at_50%_0%] max-sm:bg-radial-[200%_100%_at_50%_100%] from-gradient-start/20 w-full  h-full group sm:mask-b-from-10%  ">
        {/* Music Disc */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className=" z-[2]  overflow-hidden  aspect-square h-[600px] max-sm:h-[400px]  rounded-full absolute top-0   drop-shadow-2xl  -translate-y-1/2 left-1/2 -translate-x-1/2   "
        >
          <div className=" w-20 h-20  bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-[2] " />
          <Image
            src="https://i.ytimg.com/vi/-YlmnPh-6rE/maxresdefault.jpg"
            alt="Song Thumbnail"
            fill
            className=" object-cover object-center  "
          />
        </motion.div>
      </div>
    ),
  },
  {
    Icon: BusFront,
    name: "Bring Your Crew Onboard",
    description:
      "Invite your friends to join your club and let everyone add their flavor to the playlist.",
    href: "/sign-in",
    cta: "Try Now",
    className: "col-span-3 lg:col-span-2  bg-primary",
    background: (
      <div className=" w-full h-full  absolute bg-radial-[140%_100%_at_10%_10%] max-sm:bg-radial-[200%_100%_at_50%_100%] from-gradient-start/20 top-0 left-0  ">
        <div className="   absolute right-24 max-sm:right-14 top-0 h-full w-[400px] max-sm:w-[340px] px-6 flex flex-col  pt-12 max-sm:pt-4 gap-6 mask-b-from-5% ">
          <InviteCard isActive={true} />
          <InviteCard />
          <InviteCard />

          <div className="absolute right-20 top-[76px] max-sm:top-[48px] after:content-[''] after:absolute after:-top-1 after:-left-1 after:w-6 after:h-6 after:bg-gradient-via after:rounded-full after:animate-ping ">
            <IconPointerFilled className="w-8 h-8 max-sm:w-6 max-sm:h-6 absolute z-[2]  drop-shadow-lg" />
          </div>

          <div className=" absolute w-[1px] bg-gradient-to-b from-gradient-start/5 via-gradient-via/30 to-gradient-end/5 top-0 left-0 h-full" />
          <div className=" absolute w-[1px] bg-gradient-to-b from-gradient-start/5 via-gradient-via/30 to-gradient-end/5 top-0 right-0 h-full" />
          <div className=" absolute -left-36 opacity-10 bottom-10 ">
            <QRCode
              size={240}
              bgColor="transparent"
              fgColor="#e7727b"
              qrStyle="dots"
              value="http://locahost:3000"
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: Users,
    name: "See the Beat Come Alive",
    description:
      "Enjoy a stunning, dynamic player that brings your music to life with visuals and motion.",
    className: "col-span-3 lg:col-span-1 bg-primary",
    href: "/sign-in",
    cta: "Try Now",
    background: (
      <FourthBentoCard/>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="  relative max-w-7xl mx-auto mt-28 max-md:mt-20 max-sm:mt-4 px-6 max-sm:px-4">
      <div className=" container mx-auto   px-6  max-sm:px-2 space-y-12 max-md:space-y-8 ">
        <div className=" flex flex-col items-center gap-2">
          <h2 className=" text-4xl max-sm:text-2xl text-center font-semibold text-secondary-foreground">
            Where Vibes Meet Votes
          </h2>
          <p className=" text-lg text-subtext italic text-center max-sm:text-sm max-w-lg">
            From parties to study sessions, see how voting music transforms any
            gathering
          </p>
        </div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
