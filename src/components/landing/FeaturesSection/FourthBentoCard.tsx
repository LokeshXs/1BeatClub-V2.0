import Image from "next/image";

import { motion } from "motion/react";

import {
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconPlayerPauseFilled,
} from "@tabler/icons-react";

import Lottie from "react-lottie";
import animationData from "@/../public/assets/lottie/music-wave.json";
import { useState } from "react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SONGS_LIST = [
  {
    name: "Sunflower (Spider-Man: Into the Spider-Verse)",
    img: "https://i.ytimg.com/vi/ApXoWvfEYVU/maxresdefault.jpg",
  },
  {
    name: "Saiyaara (1980) Ft. Kishore Kumar full song ",
    img: "https://i.ytimg.com/vi/fuY2BGi2hAM/maxresdefault.jpg",
  },
  {
    name: "Lose My Mind (feat. Doja Cat) [From F1® The Movie]",
    img: "https://i.ytimg.com/vi/VJxppgsHjF8/maxresdefault.jpg",
  },
  {
    name: "One Direction - Steal My Girl",
    img: "https://i.ytimg.com/vi/UpsKGvPjAgw/maxresdefault.jpg",
  },
];

export default function FourthBentoCard() {
  const [currentSong, setCurrentSong] = useState(0);

  return (
    <div className=" absolute top-0 left-0 bg-radial-[200%_100%_at_0%_0%] max-sm:bg-radial-[200%_200%_at_0%_100%] from-gradient-start/20 w-full  h-full group sm:mask-b-from-10% p-4  ">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
        className=" w-[480px] h-[480px]  rounded-full flex justify-center items-center  absolute  -right-1/2 -bottom-[50%] opacity-60 max-sm:opacity-20  "
      >
        <div className="w-[340px] h-[340px]  rounded-full relative overflow-hidden">
          <Image
            src={SONGS_LIST[currentSong].img}
            alt={SONGS_LIST[currentSong].name}
            fill
            className=" object-cover object-center "
          />
          <div className=" w-20 h-20 rounded-full absolute bg-background z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className=" w-[440px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
          <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
        </div>
      </motion.div>
      <div className=" px-6 py-8 max-sm:px-4 max-sm:py-4  backdrop-blur-md bg-white/10 relative z-[4]  rounded-xl overflow-hidden flex flex-col items-center gap-4">
        <div className=" flex justify-center max-w-[300px] overflow-hidden">
          <motion.p
            key={currentSong}
            initial={{ x: "100%" }}
            animate={{ x: "-110%" }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
            className="   overflow-visible text-sm inline-block whitespace-nowrap"
          >
            {SONGS_LIST[currentSong].name}
          </motion.p>
        </div>
        <div className=" flex  items-center gap-12 justify-center">
          <IconCaretLeftFilled
            title="Previous"
            className=" cursor-pointer"
            onClick={() => {
              if (currentSong === 0) {
                setCurrentSong(SONGS_LIST.length - 1);
              } else {
                setCurrentSong((prev) => prev - 1);
              }
            }}
          />
          <span
            title="Pause"
            className=" w-14 h-14  backdrop-blur-md  rounded-full flex justify-center items-center cursor-pointer  border border-transparent hover:border-muted-foreground "
          >
            <IconPlayerPauseFilled />
          </span>
          <IconCaretRightFilled
            title="Next"
            className=" cursor-pointer"
            onClick={() => {
              if (currentSong === SONGS_LIST.length - 1) {
                setCurrentSong(0);
              } else {
                setCurrentSong((prev) => prev + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
