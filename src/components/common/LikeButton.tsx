"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSongs } from "@/store/useSongs";
import { useContext, useState, useTransition } from "react";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import { useMusicClubs } from "@/store/useMusicClubs";
import { ListedSongType } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { voteSong } from "@/actions/voteSong";

// Generate particle positions around the heart
const particles = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  angle: i * 60 + Math.random() * 20 - 10, // Spread around circle with some randomness
  distance: 25 + Math.random() * 15, // Random distance from center
  size: Math.random() * 3 + 2, // Random size between 2-5px
}));

export default function LikeButton({
  isSongVoted,
  song,
}: {
  isSongVoted: boolean;
  song: ListedSongType;
}) {
  const { user } = useUser();
  const upvoteSong = useSongs((state) => state.upvoteSong);
  const downvoteSong = useSongs((state) => state.downvoteSong);
  const { webSocketClient } = useContext(WebSocketContext);
  const selectedClub = useMusicClubs((state) => state.selectedClub);
  const [_, startTransition] = useTransition();

  const voteHandler = async () => {
    console.log(user?.id, song.id, selectedClub?.id);
    if (isSongVoted) {
      downvoteSong(user?.id || "", song.id);
    
      if (webSocketClient) {
        webSocketClient.send(
          JSON.stringify({
            type: "DOWNVOTE",
            data: {
              clubId: selectedClub?.id,
              songId: song.id,
              userId: user?.id,
            },
          })
        );

        startTransition(() => {
          voteSong({
            songId: song.id,
            userId: user?.id || "",
            actionType: "DOWNVOTE",
          });
        });
      }
    } else {
      upvoteSong(user?.id || "", song.id);
      
      if (webSocketClient) {
        webSocketClient.send(
          JSON.stringify({
            type: "UPVOTE",
            data: {
              clubId: selectedClub?.id,
              songId: song.id,
              userId: user?.id,
            },
          })
        );
        startTransition(() => {
          voteSong({
            songId: song.id,
            userId: user?.id || "",
            actionType: "UPVOTE",
          });
        });
      }
    }
  };
  return (
    <div className="relative">
      <motion.button
        onClick={() => voteHandler()}
        className={cn(
          "h-10 w-10 max-sm:h-8 max-sm:w-8 p flex justify-center items-center rounded-full  shadow-[inset_0px_0px_10px_rgba(182,86,240,0.8)] hover:shadow-[inset_0px_0px_15px_rgba(182,86,240,0.8)] group transition-all duration-200 cursor-pointer relative z-10",
          {
            "hover:shadow-[inset_0px_0px_15px_rgba(231,114,123,0.8)] shadow-[inset_0px_0px_10px_rgba(231,114,123,0.8)]":
              isSongVoted,
          }
        )}
        whileTap={{ scale: 0.95 }}
      >
        {/* Heart SVG with bounce animation */}
        <motion.div
          animate={
            isSongVoted
              ? {
                  scale: [1, 0.8, 1.2, 1],
                }
              : {}
          }
          transition={{
            duration: 0.6,
            ease: [0.68, -0.55, 0.265, 1.55],
            times: [0, 0.2, 0.6, 1],
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isSongVoted ? "url(#heartGradient)" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-5 transition-all duration-300 ${
              isSongVoted
                ? "text-pink-500 drop-shadow-lg"
                : "group-hover:text-[rgba(182,86,240,1)]"
            }`}
            style={{
              filter: isSongVoted
                ? "drop-shadow(0 0 8px rgba(255, 95, 151, 0.6))"
                : "none",
            }}
          >
            <defs>
              <radialGradient id="heartGradient" cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor="#ff5f97" />
                <stop offset="50%" stopColor="#e7727b" />
                <stop offset="100%" stopColor="#b656f0" />
              </radialGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </motion.div>
      </motion.button>

      {/* MAIN PARTICLES - Flying colored dots */}
      {isSongVoted &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              opacity: 1,
              scale: 0,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: [1, 1, 0],
              scale: [0, 1, 0.5],
              x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
              y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              times: [0, 0.3, 1],
            }}
            className="absolute pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: "50%",
              background: `linear-gradient(45deg, #ff5f97, #e7727b, #b656f0)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </div>
  );
}
