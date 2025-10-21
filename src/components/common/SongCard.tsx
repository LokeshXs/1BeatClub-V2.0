import { IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import { motion } from "motion/react";
import { ListedSongType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import React from "react";
import { useSongs } from "@/store/useSongs";

const SongCard = ({ song }: { song: ListedSongType })=> {
  const { user } = useUser();
  const isSongVoted = Boolean(
    song.votes.find((value) => value.user_id === user?.id)
  );

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20,filter:"blur(10px)" }}
      animate={{ opacity: 1, y: 0 ,filter:"blur(0px)"}}
      exit={{
        opacity:0,x:200
      }}
      transition={{
        duration:0.3,
        ease:"easeInOut"
      }}
      key={song.id}
      layoutId={`${song.id}`}

      className=" w-full flex gap-6 max-sm:gap-2 justify-between  py-2 px-4 max-sm:px-2 inset-shadow-custom-hover rounded-lg  "
    >
      <div className=" flex items-start gap-6 max-sm:gap-2 ">
        <div className=" bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end p-[2px]  rounded-md overflow-hidden shrink-0 max-h-[60px]">
          <Image
            src={song.thumbnail}
            alt={`${song.songTitle} poster`}
            width={90}
            height={120}
            className=" rounded-md max-sm:w-[60px]"
            priority
          />
        </div>
        <div className=" flex flex-col gap-2 flex-1 ">
          <p className=" font-semibol line-clamp-1 text-sm max-md:text-xs ">
            {song.songTitle}
          </p>
          <div className=" flex items-center gap-1">
            <IconHeart className=" w-4 h-4 max-sm:w-3 max-sm:h-3  text-neutral-400" />
            <p className=" text-xs max-sm:text-[8px] font-medium text-neutral-400">
              {song.votes.length} votes
            </p>
          </div>
        </div>
      </div>
      <div className=" flex items-center gap-4 max-sm:gap-2">
        <LikeButton isSongVoted={isSongVoted} song={song} />

        <DeleteButton song={song} />
      </div>
    </motion.div>
  );
}


export default SongCard