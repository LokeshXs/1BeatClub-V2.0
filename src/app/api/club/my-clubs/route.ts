import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const session = await auth();

    const musicClubs = await prisma.user.findUnique({
      where: { user_id: session.userId! },
      include: {
        myClubs: true,
        joinedClubs: true,
      },
    });

    // console.log(musicClubs);

    const myMusicClubs = musicClubs?.myClubs
      .concat(musicClubs.joinedClubs)
      .map((clubObj) => {
        return {
          ...clubObj,
          iAmOwner: clubObj.clubOwnerId === session.userId,
        };
      });

    console.log(myMusicClubs);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "User Clubs fetched successfully!",
        myMusicClubs: myMusicClubs,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);

    return new Response(
      JSON.stringify({
        status: "error",
        message: err?.message || "Failed to fetch clubs!",
      }),
      {
        status: err?.statusCode || 500,
      }
    );
  }
}
