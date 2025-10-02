import { HttpError } from "@/lib/HttpError";
import prisma from "@/lib/prisma";
import { createClubFormSchema } from "@/lib/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// POST request handler to create music club
export async function POST(req: Request) {
  try {
    const res = await req.json();
    const validateData = createClubFormSchema.safeParse(res);
    const session = await auth();

    if (!validateData.success) {
      throw new HttpError("Invalid Inputs!", 400);
    }

    const { clubName, description, maximumMembers } = validateData.data;

    // Check if user already have a club with same club name

    const isClubPresent = await prisma.musicClub.findFirst({
      where: {
        clubName: {
          equals: clubName,
          mode: "insensitive",
        },
        clubOwnerId: session.userId!,
      },
    });

    if (isClubPresent) {
      throw new HttpError("Club with same name is already created! 🥹", 409);
    }

    const newClub = await prisma.musicClub.create({
      data: {
        clubName: clubName,
        description: description,
        maximumMembers: maximumMembers,
        clubOwnerId: session.userId!,
      },
    });

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Club is created successfully!",
        newClub: newClub,
      }),
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);

    return new Response(
      JSON.stringify({
        status: "error",
        message: err?.message || "Club creation is failed!",
      }),
      {
        status: err?.statusCode || 500,
      }
    );
  }
}
