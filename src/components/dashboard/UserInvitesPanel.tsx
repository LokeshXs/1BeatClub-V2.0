"use client";

import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import axios from "axios";
import { UserInviteType } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import UserInvitationCard from "./UserInvitationCard";

 function UserInvitesPanel({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { isWebSocketConnected } = useContext(WebSocketContext);
  const [userInvites, setUserInvites] = useState<UserInviteType[]>([]);

  const { error, isLoading } = useQuery({
    queryKey: [isWebSocketConnected, open],
    queryFn: async () => {
      if (!isWebSocketConnected) {
        throw new Error(
          "Something went wrong while loading your invites"
        );
      }

      const response = await axios.get(
        `/api/user/invites`
      );

      const data = response.data;
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      const invites = data.invitations as UserInviteType[];
      setUserInvites(invites);

      return invites;
    },
  });

  if (error) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="h-screen p-0 flex flex-col overflow-hidden border-0 bg-background ">
          <div className="px-4 ">
            <SheetHeader>
              <SheetTitle className="text-center text-base font-semibold text-red-500">
                Oops! We couldn’t load your invites. Please try again 🙏
              </SheetTitle>
            </SheetHeader>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="h-screen max-sm:w-full p-0 flex flex-col overflow-hidden border-0 bg-background ">
        <div className="px-4 ">
          <SheetHeader>
            <SheetTitle className="text-center text-base font-semibold bg-gradient-to-r from-gradient-end via-gradient-via to-gradient-end text-transparent bg-clip-text max-sm:text-sm">
              Invites Waiting for You
            </SheetTitle>
          </SheetHeader>

          <div className=" space-y-3 mt-4">
            {!isLoading &&
              userInvites.map((invite, idx) => (
                <UserInvitationCard key={`invite-${idx}`} invitation={invite}  setInvites={setUserInvites}/>
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
                      <Skeleton className=" w-8 h-8 rounded-full bg-neutral-700" />
                      <Skeleton className=" w-8 h-8 rounded-full bg-neutral-700" />
                    </div>
                  </Skeleton>
                ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default React.memo(UserInvitesPanel)