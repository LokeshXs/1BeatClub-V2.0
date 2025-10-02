import { $Enums } from "@/generated/prisma";
import { z } from "zod";

export const createClubFormSchema = z.object({
  clubName: z
    .string()
    .min(2, {
      message: "Club Name is too short! 🤏",
    })
    .max(40, { message: "Club Name is too long! 😲" }),

  description: z.string().optional(),
  maximumMembers: z.number().refine(
    (value) => {
      if (Number(value) <= 20) {
        return true;
      } else {
        return false;
      }
    },
    { message: "Maximum 20 members allowed on free plan! 🥲" }
  ),
  clubBanner:z.instanceof(File).optional()
});

export const addSongFormSchema = z.object({
  songlink: z.string().refine(
    (data) => {
      try {
        const url = new URL(data);
        const params = new URLSearchParams(url.search);
        let videoId = params.get("v");
        // When user share using share button on video then there is a "si" param in it checking for it also
        const id = url.pathname.substring(1);
        const videoSi = params.get("si");

        videoId = videoId ? videoId : videoSi ? id : null;

        return videoId;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Please enter a youtube song video url!",
    }
  ),
});

export type InviteUserType = {
  user_id: string;
  name: string | null;
  username: string;
  email: string;
  status: $Enums.status | "";
  profileImg:string|null
};
