import { AddSongForm } from "@/components/dashboard/AddSongForm";
import BottomBadge from "@/components/dashboard/BottomBadge";
import ClubOptions from "@/components/dashboard/ClubOptions/ClubOptions";
import NoClubSection from "@/components/dashboard/NoClubSection";
import Player from "@/components/dashboard/Player/Player";
import SongsVotingList from "@/components/dashboard/SongsVotingList";
import WebSocketManager from "@/components/WebSocketManager";
import CreateClubActionProvider from "@/context/CreateClubActionProvider";
import prisma from "@/lib/prisma";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  const musicClubs = await prisma.user.findUnique({
    where: {
      user_id: session.userId!,
    },
    select: {
      myClubs: true,
      joinedClubs: true,
      Invitations: {
        where: {
          status: "PENDING",
        },
      },
    },
  });

  const myMusicClubs = musicClubs?.myClubs.concat(musicClubs.joinedClubs);
  const pendingInvitationsCount = musicClubs?.Invitations.length || 0;

  return (
    <main>
      <CreateClubActionProvider>
        <section className=" flex flex-col min-h-screen  ">
          <div className="max-w-5xl mx-auto p-6 max-md:p-2 flex justify-between w-full">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="1BeatClub Logo"
                width={100}
                height={100}
                className="max-sm:w-[80px]"
              />
            </Link>
            <UserButton />
          </div>

          <div>
            <div className=" relative border-muted-foreground  ">
              <div className="max-w-5xl mx-auto  relative  p-4 max-md:p-2 border-muted-foreground ">
                <ClubOptions
                  pendingInvitationsCount={pendingInvitationsCount}
                />
                <div className=" absolute w-[1px]  left-0 inset-y-0 bg-gradient-to-b from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
                <div className=" absolute w-[1px]  right-0 inset-y-0 bg-gradient-to-b from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
              </div>
              <div className=" absolute h-[1px]  top-0 inset-x-0 bg-gradient-to-r from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
              <div className=" absolute h-[1px]  bottom-0 inset-x-0 bg-gradient-to-r from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
            </div>
            {/* Rendering if the user contains clubs */}
            {myMusicClubs && myMusicClubs?.length > 0 && (
              <div className="p-4">
                <Player />
              </div>
            )}
          </div>
          {/* Rendering if the user contains clubs */}
          {myMusicClubs && myMusicClubs?.length > 0 && (
            <div className="  flex-1 flex flex-col relative">
              <div className=" flex-1 w-full max-w-5xl mx-auto relative bg-radial-[70%_80%_at_50%_120%] from-gradient-start/40 to-transparent">
                <div className=" relative  border-muted-foreground  ">
                  <div className=" relative max-w-5xl  border-muted-foreground mx-auto   p-4  bg-secondary backdrop-blur-xl  flex flex-col gap-4  ">
                    <AddSongForm />
                  </div>

                  <div className=" absolute h-[1px]  bottom-0 inset-x-0 bg-gradient-to-r from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
                </div>
                <div className="  border-muted-foreground mb-12 flex-1 relative  ">
                  <div className=" relative max-w-5xl   border-muted-foreground mx-auto  ">
                    <SongsVotingList />
                  </div>
                  {/* <div className=" absolute h-[1px]  bottom-0 inset-x-0 bg-gradient-to-r from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" /> */}
                </div>
                <div className=" absolute w-[1px]  left-0 inset-y-0 bg-gradient-to-b from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
                <div className=" absolute w-[1px]  right-0 inset-y-0 bg-gradient-to-b from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
              </div>
              <div className=" absolute h-[1px]  top-0 inset-x-0 bg-gradient-to-r from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" />
            </div>
          )}

          {myMusicClubs && myMusicClubs?.length <= 0 && (
            <div className=" flex-1 flex justify-between items-center  ">
              <NoClubSection />
            </div>
          )}
        </section>
        <WebSocketManager />
      </CreateClubActionProvider>

      <BottomBadge />
    </main>
  );
}
