"use server";

import prisma from "@/lib/prisma";
import { MusicClubType } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";

export async function addUserToClub(clubId: string) {
  try {
    const session = await auth();
    const userId = session.userId;

    if (!userId) {
      throw new Error("User is not logged in");
    }
    let joinedMusicClub: MusicClubType | null = null;

    //checking if a invitaion is present and deleting it

    const isInvitationPresent = await prisma.invitations.findUnique({
      where: {
        to_userId_clubId: {
          to_userId: userId,
          clubId: clubId,
        },
      },
    });

    if (isInvitationPresent) {
      await prisma.invitations.delete({
        where: {
          to_userId_clubId: {
            to_userId: userId,
            clubId: clubId,
          },
        },
      });
    }

    const result = await prisma.musicClub.update({
      where: {
        id: clubId,
      },
      data: {
        members: {
          connect: {
            user_id: userId,
          },
        },
      },
    });

    joinedMusicClub = { ...result, iAmOwner: false };

    return {
      status: "success",
      message: "Action is successfull",
      joinedMusicClub: joinedMusicClub,
    };
  } catch (err: any) {
    console.log(err);

    return {
      status: "error",
      message: "Error in processing the request!",
    };
  }
}
