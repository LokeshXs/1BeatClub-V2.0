"use client";

import { useContext, useEffect } from "react";
import SongCard from "../common/SongCard";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import SongCardSkeleton from "../skeletons/SongCardSkeleton";
import { useMusicClubs } from "@/store/useMusicClubs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CURRENT_SERVER_URL } from "@/lib/config";
import { ListedSongType } from "@/lib/types";
import { useSongs } from "@/store/useSongs";
import SuggestedSongsList from "./SuggestedSongsList";
import { AnimatePresence } from "motion/react";

export default function SongsVotingList() {
  const { connectingWebSocket } = useContext(WebSocketContext);
  const listedSongsList = useSongs((state) => state.listedSongs);
  const addSongsToList = useSongs((state) => state.addSongsToList);
  const setCurrentSong = useSongs((state) => state.setCurrentlyPlayingSong);
  const fetchingSongs = useSongs((state) => state.fetchingSongs);
  const setIsFetchingSongs = useSongs((state) => state.setIsFetchingSongs);
  const selectedMusicClub = useMusicClubs((state) => state.selectedClub);
  const fetchingClubs = useMusicClubs((state) => state.isFetchingClubs);
  const { error } = useQuery({
    queryKey: ["songs", selectedMusicClub],
    queryFn: async () => {
      console.log(selectedMusicClub);
      setIsFetchingSongs(true);
      if (fetchingClubs || !selectedMusicClub) {
        return [];
      }
      const response = await axios.get(`${CURRENT_SERVER_URL}/api/songs/all`, {
        params: {
          clubid: selectedMusicClub.id,
        },
      });

      const data = response.data;

      console.log(data);
      if (response.status !== 200) {
        throw new Error(data.message);
      }

      const songs = data.songs as ListedSongType[];

      const currentSongRes = await axios.get(
        `${CURRENT_SERVER_URL}/api/club/current-song`,
        {
          params: {
            clubid: selectedMusicClub.id,
          },
        }
      );

      if (currentSongRes.status !== 200) {
        throw new Error(data.message);
      }

      const clubsCurrentSongId = currentSongRes.data
        .currentlyPlayingSongId as number;

      // Find Song Currently playing using CurrentSongId from selectedClub
      const currentSongPlaying = songs.find(
        (song) => song.id === clubsCurrentSongId
      );

      // Creating new array by filtering out the current song playing
      let newListedSongs = songs.filter(
        (song) => song.id !== currentSongPlaying?.id
      );

      if (currentSongPlaying) {
        setCurrentSong(currentSongPlaying);
      } else if (newListedSongs.length > 0) {
        setCurrentSong(newListedSongs[0]);
        newListedSongs = newListedSongs.slice(1);
      } else {
        setCurrentSong(null);
      }
      addSongsToList(newListedSongs);
      setIsFetchingSongs(false);
      return songs;
    },
    refetchOnWindowFocus: false,
    staleTime: 0, // Make data instantly stale so it always refetches
    gcTime: 0, // Disable cache storage entirely
  });

  if (connectingWebSocket || fetchingSongs) {
    return (
      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto ">
        {new Array(6).fill(0).map((value, index) => (
          <SongCardSkeleton key={`songcardskeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className=" text-red-500">
        We’re having trouble loading the songs. Please refresh or try again
        shortly
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-h-[500px] min-h-[200px] overflow-y-auto p-4 overflow-x-hidden">
      <AnimatePresence mode="sync">
        {listedSongsList.map((listedSong, idx) => (
          <SongCard key={`listed-song-${idx}`} song={listedSong} />
        ))}
      </AnimatePresence>

      {/* <SongCard
        song={{
          clubId: "1b82c5e9-a8f0-466f-a110-4bc787fe246e",
          highResThumbnail:
            "https://i.ytimg.com/vi/Fbv6-50S1lc/maxresdefault.jpg",
          id: 2,
          link: "https://www.youtube.com/watch?v=Fbv6-50S1lc&list=RDMMFbv6-50S1lc&start_radio=1",
          songTitle:
            "MF GABHRU! (Official Video) KARAN AUJLA | IKKY | Latest Punjabi Songs 2025",
          thumbnail: "https://i.ytimg.com/vi/Fbv6-50S1lc/mqdefault.jpg",
          user_id: "user_30bce7IVbyXKk7AJAW7pPxYQvaN",
          videoId: "Fbv6-50S1lc",
          votes: [],
        }}
      /> */}

      {/* SUGGESTED SONGS BY AI */}
      {/* <SuggestedSongsList /> */}
    </div>
  );
}
