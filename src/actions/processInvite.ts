"use server";

import prisma from "@/lib/prisma";
import { MusicClubType, UserInviteType } from "@/lib/types";

export async function processInvite(
  invite: UserInviteType,
  actionType: "ACCEPT" | "DECLINE"
) {
  try {
    let joinedMusicClub: MusicClubType | null = null;
    if (actionType === "ACCEPT") {
      // Doing Prisma transaction to make sure either both runs or none
      const transactionRes = await prisma.$transaction([
        prisma.musicClub.update({
          where: {
            id: invite.clubId,
          },
          data: {
            members: {
              connect: {
                user_id: invite.to_userId,
              },
            },
          },
        }),

        prisma.invitations.update({
          where: {
            id: invite.id,
          },
          data: {
            status: "ACCEPTED",
          },
        }),
      ]);

      joinedMusicClub = { ...transactionRes[0], iAmOwner: false };
    } else {
      await prisma.invitations.delete({
        where: {
          id: invite.id,
        },
      });
    }

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
