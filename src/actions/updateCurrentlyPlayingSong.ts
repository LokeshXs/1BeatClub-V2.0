"use server";

import prisma from "@/lib/prisma";

export const updateCurrentlyPlayingSong = async (
  songId: number | null,
  clubId: string
) => {
  try {
    await prisma.musicClub.update({
      where: {
        id: clubId,
      },
      data: {
        currentlyPlatingSongId: songId,
      },
    });

    return {
      status: "success",
      message: "Current song updated successfully",
    };
  } catch (err: any) {
    return {
      status: "error",
      message: err.message ? err.message : "Something went wrong",
    };
  }
};
