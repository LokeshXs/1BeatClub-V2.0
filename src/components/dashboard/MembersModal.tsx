"use client";

import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useMusicClubs } from "@/store/useMusicClubs";
import axios from "axios";
import { MembersType } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import ClubMemberCard from "./ClubMemberCard";
import { WebSocketContext } from "@/context/WebSocketClientProvider";



 function MembersModal({
  openMembersModal,
  setOpenMembersModal,
}: {
  openMembersModal: boolean;
  setOpenMembersModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [members, setMembers] = useState<MembersType[]>([]);
  const selectedClub = useMusicClubs((state) => state.selectedClub);
    const { isWebSocketConnected } = useContext(WebSocketContext);

  const { error, isLoading } = useQuery({
    queryKey: [openMembersModal,"club members",isWebSocketConnected],
    queryFn: async () => {

           if (!isWebSocketConnected) {
        throw new Error(
          "Something went wrong while loading your invites"
        );
      }
      const response = await axios.get(
        `/api/club/members`,
        {
          params: {
            clubId: selectedClub?.id,
          },
        }
      );

      const data = response.data;
      if (response.status !== 200) {
        throw new Error(data.message);
      }

      
      const clubMembers = data.members as MembersType[];

   
      setMembers(clubMembers);
      return clubMembers;
    },
  });

  if (error) {
    return (
      <Dialog open={openMembersModal} onOpenChange={setOpenMembersModal}>
        <DialogContent className="  inset-shadow-custom-hover    border border-muted-foreground   py-12 px-4 bg-radial-[80%_80%] from-gradient-start/10 to-background  ">
          <p className="text-center text-base font-semibold  text-red-500">
            Unable to load club members. Please try again later 🙏
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={openMembersModal} onOpenChange={setOpenMembersModal}>
      <DialogContent className="  inset-shadow-custom-hover    border border-muted-foreground   py-4 px-0 bg-radial-[80%_80%] from-gradient-start/10 to-background  ">
        <p className="text-center text-base font-semibold bg-gradient-to-r from-gradient-end via-gradient-via to-gradient-end text-transparent bg-clip-text">
          Your Club Crew
        </p>

        <div className=" max-h-[300px] min-h-[200px] overflow-y-auto px-4  space-y-3">
          {members.length === 0 && !isLoading && (
            <p className=" text-center py-12">
              No members yet. Time to grow your club!
            </p>
          )}
          {members.length > 0 &&
            !isLoading &&
            members.map((value, idx) => (
              <ClubMemberCard
                key={`member-${idx}`}
                member={value}
                setMembers={setMembers}
              />
            ))}

          {isLoading &&
            Array(6)
              .fill(0)
              .map((_, idx) => (
                <Skeleton
                  key={`skeleton-${idx}`}
                  className="px-4 py-2 flex justify-between items-center bg-neutral-700/40"
                >
                  <div className=" flex flex-col items-start gap-1 ">
                    <Skeleton className=" h-4 w-24 rounded-full bg-neutral-700" />

                    <Skeleton className=" w-32 h-4 rounded-lg bg-neutral-700" />
                  </div>
                  <div className=" flex items-center gap-3">
                    <Skeleton className=" w-20 h-8 rounded-lg bg-neutral-700" />
                  </div>
                </Skeleton>
              ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(MembersModal);
