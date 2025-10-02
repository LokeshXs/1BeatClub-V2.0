"use server";

import prisma from "@/lib/prisma";

export const voteSong = async ({
  songId,
  userId,
  actionType,
}: {
  songId: number;
  userId: string;
  actionType: "UPVOTE" | "DOWNVOTE";
}) => {
  try {
    if (actionType === "UPVOTE") {
      await prisma.votes.create({
        data: {
          songId: songId,
          user_id: userId,
        },
      });
    } else {
      await prisma.votes.delete({
        where: {
          songId_user_id: {
            songId: songId,
            user_id: userId,
          },
        },
      });
    }

    return {
      status: "success",
      message: "Song voted successfully!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error.message || "Something went wrong, Try Again!",
    };
  }
};
