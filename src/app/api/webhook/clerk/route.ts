import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body.data);

    const data = body.data;
    const userId = data.id;
    const name = `${data.first_name} ${data.last_name}`;
    const username = data.username;
    const image_url = data?.image_url || "";
    const email = data.email_addresses[0].email_address;

    const userExist = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    if (!userExist) {
      await prisma.user.create({
        data: {
          user_id: userId,
          name: name,
          email: email,
          username: username,
          profileImage:image_url
        },
      });
    }

    return new Response(JSON.stringify({ message: "Event Received" }), {
      status: 200,
    });
  } catch (err: any) {
    console.log(err);
    return new Response("", { status: 400 });
  }
}
