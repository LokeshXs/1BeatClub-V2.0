"use server";

import prisma from "@/lib/prisma";
import { InviteUserType } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";

export async function inviteUser(
  user: InviteUserType,
  actionType: "INVITE" | "DELETE",
  clubId: string,
  clubName: string,
  userName: string
) {
  try {
    const session = await auth();
    let resMessage = "";

    if (actionType === "INVITE") {
      await prisma.invitations.create({
        data: {
          to_userId: user.user_id,
          clubId: clubId,
          clubOwnerId: session.userId!,
          to_username: user.username,
          status: "PENDING",
          clubName: clubName,
          clubOwnerUserName: userName,
        },
      });

      resMessage = "Invitation Sent Successfully!";
    } else {
      await prisma.invitations.delete({
        where: {
          to_userId_clubId: {
            to_userId: user.user_id,
            clubId: clubId,
          },
        },
      });

      resMessage = "Invitation revoked successfully!";
    }

    return {
      status: "success",
      message: resMessage,
    };
  } catch (err: any) {
    console.log(err);
    return {
      status: "error",
      message: err.message ? err.message : "Something went wrong",
    };
  }
}
