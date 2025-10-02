"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Lottie from "react-lottie";
import animationData from "@/../public/assets/lottie/music-wave.json";
import { ListedSongType } from "@/lib/types";


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function ClubMemberPlayerView({currentlyPlayingSong}:{currentlyPlayingSong:ListedSongType}) {
  return (
    <div className="p-4 z-10 flex flex-col gap-2">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className=" w-[440px] h-[440px]  rounded-full flex justify-center items-center  bg-background  "
      >
        <div className="w-[340px] h-[340px]  rounded-full relative overflow-hidden">
          <Image
            src={currentlyPlayingSong.highResThumbnail || currentlyPlayingSong.thumbnail}
            alt={`${currentlyPlayingSong.songTitle} poster`}
            fill
            className=" object-cover object-center "
          />
          <div className=" w-20 h-20 rounded-full absolute bg-background z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
        </div>

          <div className=" w-[440px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
      </div>
      </motion.div>
      <div className=" w-full flex gap-6 items-center px-4">
        <div className="w-[400px] overflow-hidden ">
          <p className=" truncate  drop-shadow-md">
            {currentlyPlayingSong.songTitle}
          </p>
        </div>
      </div>
    </div>
  );
}
