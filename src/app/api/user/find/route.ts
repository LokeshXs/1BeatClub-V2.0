import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const searchBy = searchParams.get("searchBy");
    const clubId = searchParams.get("clubId");

    const searchedUsers = await prisma.user.findMany({
      where: {
        AND: [
          {
            user_id: {
              not: session.userId!,
            },
          },
          {
            OR: [
              {
                username: {
                  contains: searchBy || "",
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: searchBy || "",
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      },
      select: {
        user_id: true,
        name: true,
        username: true,
        email: true,
        profileImage:true,
        Invitations: {
          where: {
            clubId: clubId!,
          },
          select: {
            status: true,
          },
        },
      },
    });

    const updatedSearchedUsers = searchedUsers.map((user) => ({
      user_id: user.user_id,
      name: user.name,
      username: user.username,
      email: user.email,
      profileImg:user.profileImage,
      status: user.Invitations[0]?.status || "", // could be "PENDING", "REJECTED", etc.
    }));

    console.log(searchedUsers);
    return new Response(
      JSON.stringify({
        status: "success",
        message: "Fetched the users",
        users: updatedSearchedUsers,
      }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.log(err);

    return new Response(
      JSON.stringify({
        status: "error",
        message: err?.message || "Failed to fetch users!",
      }),
      {
        status: err?.statusCode || 500,
      }
    );
  }
}
