import { HttpError } from "@/lib/HttpError";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const clubId = params.get("clubId");

    if (!clubId) {
      throw new HttpError("Invalid Club id", 404);
    }

    const members = await prisma.musicClub.findUnique({
      where: {
        id: clubId,
      },
      select: {
        members: true,
      },
    });

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Members fetched successfull",
        members: members?.members || [],
      }),{status:200}
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
