import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ListedSongType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function songsSorting(songs: ListedSongType[]) {
  return songs
    .sort((a, b) => {
      if (a.songTitle < b.songTitle) {
        return -1;
      } else if (a.songTitle > b.songTitle) {
        return 1;
      } else {
        return 0;
      }
    })
    .sort((a, b) => b.votes.length - a.votes.length);
}