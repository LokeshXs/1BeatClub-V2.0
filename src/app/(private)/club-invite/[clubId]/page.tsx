import JoinClub from "@/components/dashboard/JoinClub";
import prisma from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ clubId: string }>;
}) {
  const { clubId } = await params;
  
  const club = await prisma.musicClub.findUnique({
    where:{
      id:clubId
    },
    select:{
      clubName:true
    }
  });



  return (
    <main className=" min-h-screen w-full bg-background text-white   bg-radial-[100%_100%_at_50%_0%] from-gradient-start/20 to-transparent">
      <JoinClub clubId={clubId} clubName={club?.clubName||""} />
    </main>
  );
}
