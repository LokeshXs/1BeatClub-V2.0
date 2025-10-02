"use server";

import prisma from "@/lib/prisma";

export const removeSong = async ({ songId }: { songId: number }) => {
  try {
    await prisma.listedSongs.delete({
      where: {
        id: songId,
      },
    });
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error.message || "Something went wrong, Try Again!",
    };
  }
};
