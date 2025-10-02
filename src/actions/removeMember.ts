"use server";

import prisma from "@/lib/prisma";

export async function removeMember({
  clubId,
  userId,
}: {
  clubId: string;
  userId: string;
}) {
  try {
    await prisma.musicClub.update({
      where: {
        id: clubId,
      },
      data: {
        members: {
          disconnect: {
            user_id: userId,
          },
        },
      },
    });

    // Checking if an invitaion is there

    await prisma.invitations.deleteMany({
      where: {
        to_userId: userId,
        clubId: clubId,
      },
    });

    return {
      status: "success",
      message: "Member is successfully removed",
    };
  } catch (err) {
    console.log(err);

    return {
      status: "error",
      message: "Error in processing the request!",
    };
  }
}
