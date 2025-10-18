import { $Enums } from "@/generated/prisma";

export type MusicClubType = {
  iAmOwner: boolean;
  id: string;
  created_at: Date;
  clubName: string;
  description: string | null;
  clubOwnerId: string;
  maximumMembers: number;
  currentlyPlatingSongId: number | null;
};

export type ListedSongType = {
  id: number;
  songTitle: string;
  user_id: string;
  thumbnail: string;
  highResThumbnail: string | null;
  link: string;
  videoId: string;
  clubId: string;
  votes: { songId: number; user_id: string }[];
};

export type UserInviteType = {
  id: number;
  status: $Enums.status;
  created_at: Date;
  to_userId: string;
  to_username: string;
  clubId: string;
  clubOwnerId: string;
  clubOwnerUserName:string;
  clubName:string
};

export type MembersType = {
    id: number;
    email: string;
    created_at: Date;
    user_id: string;
    name: string | null;
    profileImage: string | null;
    username: string;
}
