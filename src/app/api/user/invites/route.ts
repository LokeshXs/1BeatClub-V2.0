import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const session = await auth();

    const invites = await prisma.user.findUnique({
      where: {
        user_id: session.userId!,
      },
      select: {
        Invitations: {
          where: {
            status: "PENDING",
          },
        },
      },
    });

    const invitations = invites?.Invitations || [];

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Invitations fetched successfully!",
        invitations: invitations,
      })
    );
  } catch (err: any) {
    console.log(err);
    return new Response(
      JSON.stringify({
        status: "error",
        message: err?.message || "Failed to fetch user invitations!",
      }),
      {
        status: err?.statusCode || 500,
      }
    );
  }
}
