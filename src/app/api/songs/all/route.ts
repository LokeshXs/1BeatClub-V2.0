import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clubid = searchParams.get("clubid");

    if (!clubid) {
      throw new Error("No club id found");
    }

    const allListedSongs = await prisma.musicClub.findUnique({
      where: {
        id: clubid,
      },
      select: {
        listedSongs: {
          select: {
            id: true,
            songTitle: true,
            link: true,
            clubId:true,
            thumbnail: true,
            highResThumbnail: true,
            videoId: true,
            votes: {
              select: {
                songId: true,
                user_id: true,
              },
            },
          },
        },
      },
    });

    return Response.json({
      status: "success",
      message: "Club songs fetched successfully",
      songs: allListedSongs?.listedSongs || [],
    });
  } catch (err: any) {
    console.log(err);

    return new Response(
      JSON.stringify({
        status: "error",
        message: err?.message || "Failed to fetch songs!",
      }),
      {
        status: err?.statusCode || 500,
      }
    );
  }
}
