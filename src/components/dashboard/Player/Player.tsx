"use client";
import { useContext } from "react";
import ClubOwnerPlayerView from "./ClubOwnerPlayerView";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import ClubMemberPlayerView from "./ClubMemberPlayerView";
import { useSongs } from "@/store/useSongs";
import { useMusicClubs } from "@/store/useMusicClubs";

export default function Player() {
  const { connectingWebSocket } = useContext(WebSocketContext);
  const currentlyPlayingSong = useSongs((state) => state.currentlyPlayingSong);
  const fetchingSongs = useSongs((state) => state.fetchingSongs);
  const selectedClub = useMusicClubs((state) => state.selectedClub);

  if (connectingWebSocket || fetchingSongs) {
    return (
      <div className="  flex justify-center relative overflow-hidden p-4 ">
        <Skeleton className=" w-[600px] aspect-video bg-neutral-600" />

        {/* <div className=" absolute z-0 top-0 left-0 w-full h-full  mask-radial-[50%_90%] mask-radial-to-90% bg-neutral-600/40 bg-cover bg-center " /> */}
      </div>
    );
  }

  if (!currentlyPlayingSong) {
    return (
      <div className="py-8 max-sm:py-24">
        <p className=" text-center bg-gradient-to-r from-gradient-start to-gradient-end  bg-clip-text text-transparent font-medium text-lg max-md:text-base max-sm:text-sm">
          The dance floor is empty — who’s dropping the first track?
        </p>
      </div>
    );
  }

  return (
    <div className="  flex justify-center relative overflow-hidden ">
      {selectedClub?.iAmOwner ? (
        <ClubOwnerPlayerView currentlyPlayingSong={currentlyPlayingSong} />
      ) : (
        <ClubMemberPlayerView currentlyPlayingSong={currentlyPlayingSong} />
      )}

      <motion.div
        key={currentlyPlayingSong.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className=" absolute z-0 top-0 left-0 w-full h-full  mask-radial-[50%_90%] mask-radial-to-90%  bg-cover bg-center "
        style={{
          backgroundImage: `url(${
            currentlyPlayingSong?.highResThumbnail ||
            currentlyPlayingSong?.thumbnail
          })`,
        }}
      />
    </div>
  );
}
