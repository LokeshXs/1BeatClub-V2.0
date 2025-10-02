import { ListedSongType } from "@/lib/types";
import { songsSorting } from "@/lib/utils";
import { create } from "zustand";

type StoreType = {
  listedSongs: ListedSongType[];
  currentlyPlayingSong: ListedSongType | null;
  addSongsToList: (songs: ListedSongType[]) => void;
  setCurrentlyPlayingSong: (song: ListedSongType | null) => void;
  addNewSongToList: (song: ListedSongType) => void;
  fetchingSongs: boolean;
  setIsFetchingSongs: (status: boolean) => void;
  skipToNextSong: () => void;
  resetState: () => void;
  upvoteSong: (userId: string, songId: number) => void;
  downvoteSong: (userId: string, songId: number) => void;
  removeSongFromList: (songId: number) => void;
};

export const useSongs = create<StoreType>((set) => ({
  listedSongs: [],
  fetchingSongs: false,
  currentlyPlayingSong: null,
  addSongsToList: (songs) => {
    const songsSorted = songsSorting(songs);
    set({
      listedSongs: songsSorted,
    });
  },
  setCurrentlyPlayingSong: (song) => {
    set({ currentlyPlayingSong: song });
  },
  addNewSongToList: (newSong) => {
    set((prevState) => ({
      currentlyPlayingSong: prevState.currentlyPlayingSong || newSong,
      listedSongs: prevState.currentlyPlayingSong
        ? songsSorting([...prevState.listedSongs, newSong])
        : prevState.listedSongs,
    }));
  },
  setIsFetchingSongs: (status) => {
    set({ fetchingSongs: status });
  },
  skipToNextSong: () => {
    set((prevState) => ({
      currentlyPlayingSong: prevState.listedSongs[0],
      listedSongs: prevState.listedSongs.slice(1),
    }));
  },
  resetState: () => {
    set({
      currentlyPlayingSong: null,
      listedSongs: [],
    });
  },
  upvoteSong: (userId, songId) => {
    set((prev) => ({
      listedSongs: songsSorting(
        prev.listedSongs.map((song) =>
          song.id === songId
            ? {
                ...song,
                votes: [...song.votes, { userId: userId, songId: songId }],
              }
            : song
        )
      ),
    }));
  },
  downvoteSong: (userId, songId) => {
    set((prev) => ({
      listedSongs: songsSorting(
        prev.listedSongs.map((song) =>
          song.id === songId
            ? {
                ...song,
                votes: song.votes.filter((vote) => vote.userId !== userId),
              }
            : song
        )
      ),
    }));
  },
  removeSongFromList: (songId) => {
    set((prev) => ({
      listedSongs: songsSorting(
        prev.listedSongs.filter((value) => value.id !== songId)
      ),
    }));
  },
}));
