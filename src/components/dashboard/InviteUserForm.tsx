import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import axios from "axios";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { InviteUserType } from "@/lib/schema";
import InviteUserCard from "./InviteUserCard";
import { useMusicClubs } from "@/store/useMusicClubs";
import { toast } from "sonner";



 function InviteUserForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchingUsers, setSearchingUsers] = useState(false);
  const [fetchedUsers, setFetchedUsers] = useState<InviteUserType[]>([]);
  const [searchBy, setSearchBy] = useState("");
  const debouncedSearchByValue = useDebounce<string>(searchBy);
  const selectedClub = useMusicClubs((state) => state.selectedClub);

  //  useEffect to send request to API to search for users

  useEffect(() => {
    const findUsers = async () => {
      setSearchingUsers(true);

      const res = await axios.get("/api/user/find", {
        params: {
          searchBy: debouncedSearchByValue,
          clubId: selectedClub?.id,
        },
      });

      if (res.status !== 200) {
        toast.error("Error: Error while searching users!");
        setSearchingUsers(false);
        return;
      }

      const data = res.data;

      const users = data.users as InviteUserType[];

    

      setFetchedUsers(users);
      setSearchingUsers(false);
    };

    if (debouncedSearchByValue) {
      findUsers();
    }
  }, [debouncedSearchByValue]);

  return (
    <Sheet open={open} onOpenChange={(open)=>{

      if(!open){
        setFetchedUsers([]);
        setSearchBy("");
      }
      setOpen(open)
    }}>
      <SheetContent className="h-screen p-0 flex flex-col overflow-hidden border-0 bg-background  max-sm:w-full">
        <div className="px-4 ">
          <SheetHeader>
            <SheetTitle className="text-center text-base font-semibold bg-gradient-to-r from-gradient-end via-gradient-via to-gradient-end text-transparent bg-clip-text max-sm:text-sm">
              Invite Friends to Your Club
            </SheetTitle>
          </SheetHeader>

          <div className="mt-4 max-sm:mt-2">
            <Input
              onChange={(event) => {
                setSearchBy(event.target.value);
                if (event.target.value === "") {
                  setFetchedUsers([]);
                }
              }}
              placeholder="Search by username or email"
              className="w-full placeholder:text-neutral-500 border-gradient-end/40 hover:border-gradient-end/60 focus-visible:border-gradient-end focus-visible:ring-gradient-end/40 selection:bg-gradient-end/40 max-sm:text-xs max-sm:h-8"
            />
          </div>
        </div>

        <div className=" w-[80%] mx-auto my-2  bg-gradient-to-r from-gradient-end/20 via-gradient-via/60 to-gradient-end/20 h-[1px] rounded-full " />

        {/* This fills remaining space and scrolls */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3 bg-gradient-to-b from-background to-gradient-start/20">
          {!searchingUsers &&
            fetchedUsers.map((value) => (
              <InviteUserCard key={value.email} user={value} />
            ))}

          {searchingUsers
            ? Array(6)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton
                    key={`skeleton-${idx}`}
                    className="px-4 py-2 flex justify-between items-center bg-neutral-700/40"
                  >
                    <div className=" flex gap-2 items-center">
                      <Skeleton className=" h-6 w-6 rounded-full bg-neutral-700" />

                      <Skeleton className=" w-32 h-4 rounded-lg bg-neutral-700" />
                    </div>
                    <Skeleton className=" w-20 h-8 rounded-md bg-neutral-700" />
                  </Skeleton>
                ))
            : fetchedUsers.length === 0 && (
                <p className="text-neutral-400 text-center text-sm py-12 max-sm:text-xs">
                  {searchBy ? "No user found!" : "Search by username or email"}
                </p>
              )}
        </div>
      </SheetContent>
    </Sheet>
  );
}


export default React.memo(InviteUserForm)
