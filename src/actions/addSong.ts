"use server";

import { addSongFormSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { string, z } from "zod";
import prisma from "@/lib/prisma";

// This server action gets the song info from YT API and add the song in DB then return the info
export async function addSongInClub(
  value: z.infer<typeof addSongFormSchema>,
  clubId: string
) {
  try {
    const session = await auth();

    if (!clubId) {
      throw new Error("Not Club id found, Please refresh!");
    }
    const validateData = addSongFormSchema.safeParse(value);

    if (!validateData.success) {
      throw new Error("Invalid Song link!");
    }

    const { songlink } = validateData.data;

    const url = new URL(songlink);
    const params = new URLSearchParams(url.search);

    let videoId: string | null;
    let videoSi: string | null;

    if (params.get("v")) {
      videoId = params.get("v");
    } else {
      // When user share using share button on video then there is a "si" param in it checking for it also
      videoId = url.pathname.substring(1);
      videoSi = params.get("si");

      videoId = videoSi ? videoId : null;
    }

    if (!videoId) {
      throw new Error("Invalid Song link!");
    }

    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos`,
      {
        params: {
          part: "snippet",
          id: videoId,
          key: process.env.GOOGLE_API_KEY,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = response.data;
    const videoDetails = data.items[0].snippet;

    const highResoultionThumbnail =
      videoDetails.thumbnails?.maxres?.url ||
      videoDetails.thumbnails?.standard?.url ||
      videoDetails.thumbnails?.high?.url ||
      videoDetails.thumbnails?.medium?.url;

    //   Storing the data in Database
    const newSong = await prisma.listedSongs.create({
      data: {
        user_id: session.userId!,
        songTitle: videoDetails.title,
        thumbnail: videoDetails.thumbnails.medium.url,
        highResThumbnail: highResoultionThumbnail,
        link: songlink,
        videoId: videoId,
        clubId: clubId,
      },
    });
    return {
      status: "success",
      message: "Video Details Fetched Successfully",
      data: {
      ...newSong
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error.message || "Something went wrong, Try Again!",
    };
  }
}
