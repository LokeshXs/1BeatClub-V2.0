import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
   
    const { searchParams } = new URL(req.url);
    const clubid = searchParams.get("clubid");

    if (!clubid) {
      throw new Error("Invalid Club Id");
    }

    const musicClub = await prisma.musicClub.findUnique({
      where: { id: clubid },
      select: {
        currentlyPlatingSongId: true,
      },
    });

    // console.log(musicClubs);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Clubs current song fetched successfully!",
        currentlyPlayingSongId: musicClub?.currentlyPlatingSongId || null,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);

    return new Response(
      JSON.stringify({
        status: "error",
        message: err?.message || "Failed to fetch current song!",
      }),
      {
        status: err?.statusCode || 500,
      }
    );
  }
}
