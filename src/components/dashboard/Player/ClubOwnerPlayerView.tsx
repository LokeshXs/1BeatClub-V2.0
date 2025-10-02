"use client";

import YouTube from "react-youtube";
import { Button } from "@/components/ui/button";
import { IconChevronRight } from "@tabler/icons-react";
import { motion } from "motion/react";
import { ListedSongType } from "@/lib/types";
import { useSongs } from "@/store/useSongs";
import { updateCurrentlyPlayingSong } from "@/actions/updateCurrentlyPlayingSong";
import { useMusicClubs } from "@/store/useMusicClubs";
import { useContext, useEffect, useTransition } from "react";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import { removeSong } from "@/actions/removeSong";

export default function ClubOwnerPlayerView({
  currentlyPlayingSong,
}: {
  currentlyPlayingSong: ListedSongType;
}) {
  const nextSongPlease = useSongs((state) => state.skipToNextSong);
  const selectedClub = useMusicClubs((state) => state.selectedClub);
  const { webSocketClient } = useContext(WebSocketContext);
  const [_, startTransition] = useTransition();

  function playNextSong() {
    nextSongPlease();

    // Sending event for Currently playing song change
    if (webSocketClient?.readyState === WebSocket.OPEN) {
      webSocketClient.send(
        JSON.stringify({
          type: "SONGCHANGE",
          data: {
            clubId: selectedClub?.id,
          },
        })
      );
    }
  }

  return (
    <div className="z-10 p-4 max-sm:p-0 max-w-5xl mx-auto flex flex-col items-center gap-2">
      <YouTube
        id="yt-video"
        iframeClassName=" w-[700px]  max-2xl:w-[500px] max-sm:w-full  aspect-video rounded-lg  "
        videoId={currentlyPlayingSong.videoId}
        opts={{
          playerVars: {
            autoplay: 1,
            enablejsapi: 1,
            // controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            mute: 0,
          },
        }}
        onPlay={async (event: any) => {
          if (selectedClub) {
            updateCurrentlyPlayingSong(
              currentlyPlayingSong.id || null,
              selectedClub.id
            );
          }
        }}
        onEnd={async (event: any) => {
          // Sending request to remove song from DB
          startTransition(() => {
            removeSong({ songId: currentlyPlayingSong.id });
          });

          // Playing next song
          playNextSong();
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
        className=" w-full flex   gap-6 max-md:gap-2 items-center justify-center px-4 "
      >
        <div className="w-[400px] overflow-hidden max-sm:w-[240px]  ">
          <p className=" truncate  drop-shadow-md max-md:text-center max-md:text-xs ">
           {currentlyPlayingSong.songTitle}
          </p>
        </div>
        <Button className=" bg-gradient-to-r from-gradient-start/80 via-gradient-via/80  to-gradient-end/80 bg-[length:200%_100%] bg-right  cursor-pointer flex items-center group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500  group flex-1 max-md:text-xs max-md:h-8 max-md:hidden">
          Next Song
          <IconChevronRight className=" group-hover:translate-x-1 transition-all duration-300" />
        </Button>
        <Button className=" bg-gradient-to-r from-gradient-start/80 via-gradient-via/80  to-gradient-end/80 bg-[length:200%_100%] bg-right  cursor-pointer flex items-center group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500  group  max-md:text-xs  max-md:h-8 md:hidden ">
          <IconChevronRight className=" group-hover:translate-x-1 transition-all duration-300" />
        </Button>
      </motion.div>
    </div>
  );
}
