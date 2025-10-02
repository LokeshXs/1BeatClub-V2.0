import { MusicClubType } from "@/lib/types";
import { create } from "zustand";

type StoreType = {
  isFetchingClubs: boolean;
  setIsFetchingClubs: (fetchingClubs: boolean) => void;
  musicClubs: MusicClubType[];
  setMusicClubs: (musicClubs: MusicClubType[]) => void;
  selectedClub: MusicClubType | null;
  setSelectedClub: (musicClub: MusicClubType | null) => void;
  addNewClub: (musicClub: MusicClubType) => void;
  removeClub: (musicClub: MusicClubType) => void;
};

export const useMusicClubs = create<StoreType>((set) => ({
  isFetchingClubs: true,
  setIsFetchingClubs: (isFetchingClubs) => {
    set({ isFetchingClubs: isFetchingClubs });
  },
  musicClubs: [],
  setMusicClubs: (musicClubs) => {
    set({ musicClubs: musicClubs });
  },
  selectedClub: null,
  setSelectedClub: (musicClub) => {
    set({ selectedClub: musicClub });
  },
  addNewClub: (musicClub) => {
    set((prevState) => ({
      musicClubs: [...prevState.musicClubs, musicClub],
    }));
  },
    removeClub: (musicClub) => {
    set((prevState) => ({
      musicClubs: prevState.musicClubs.filter(club=>club.id !== musicClub.id)
    }));
  },
}));
