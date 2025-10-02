"use client";

import { useContext, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { IconChevronsDown, IconCircleDashedCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMusicClubs } from "@/store/useMusicClubs";
import { MusicClubType } from "@/lib/types";
import { useSongs } from "@/store/useSongs";
import { useUser } from "@clerk/nextjs";

export default function ClubSelector() {
  const { connectingWebSocket, isWebSocketConnected, webSocketClient } =
    useContext(WebSocketContext);
  const { user } = useUser();
  const [openClubSelector, setOpenClubSelector] = useState(false);
  const {
    setIsFetchingClubs,
    isFetchingClubs,
    setSelectedClub,
    selectedClub,
    musicClubs,
    setMusicClubs,
  } = useMusicClubs();

  const { error } = useQuery({
    queryKey: [isWebSocketConnected],
    queryFn: async () => {
      if (!isWebSocketConnected) {
        throw new Error(
          "Something went wrong while loading your clubs. Please refresh and try again!"
        );
      }

      const response = await axios.get(
        `/api/club/my-clubs`
      );

      const data = response.data;
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      const myClubs = data.myMusicClubs as MusicClubType[];
      setMusicClubs(myClubs);

      setSelectedClub(myClubs[0] || null);
      setIsFetchingClubs(false);
      return myClubs;
    },
  });

  // Sending Websocket events when Club changes
  useEffect(() => {
    if (webSocketClient?.readyState === WebSocket.OPEN && selectedClub) {
      webSocketClient.send(
        JSON.stringify({
          type: "club-change",
          clubId: selectedClub?.id,
          userId: user?.id || "",
        })
      );
    }
  }, [selectedClub, user?.id, webSocketClient]);

  if (connectingWebSocket || isFetchingClubs) {
    return <Skeleton className="h-8 w-[300px] max-sm:w-[200px] bg-neutral-600" />;
  }

  if (error !== null) {
    return (
      <p className=" text-red-500 max-sm:text-sm">
        We couldn’t load your clubs. Please try again.
      </p>
    );
  }

  return (
    <Popover open={openClubSelector} onOpenChange={setOpenClubSelector}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openClubSelector}
          className="w-[300px] max-sm:w-[220px] justify-between border-muted-foreground/60 hover:border-muted-foreground bg-primary hover:text-white hover:bg-primary inset-shadow-custom hover:inset-shadow-custom-hover group max-sm:text-xs "
        >
          {selectedClub ? (
            <span className=" flex gap-4 items-center ">
              <p>
               
                {
                  musicClubs.find((club) => club.id === selectedClub.id)
                    ?.clubName
                }
              </p>
              <p className="text-neutral-500">
                (
                {musicClubs.find((club) => club.id === selectedClub.id)
                  ?.iAmOwner
                  ? "Creator"
                  : "Member"}
                )
              </p>
            </span>
          ) : (
            "Select Club..."
          )}
          <IconChevronsDown className={cn("ml-2 h-4 w-4 shrink-0 text-neutral-500 group-hover:text-gradient-via group-hover:translate-y-[1px] transition-transform duration-200 ",{
            "text-gradient-via":openClubSelector
          })} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] max-sm:w-[220px] p-0 ">
        <Command>
          <CommandInput className=" max-sm:text-xs" placeholder="Search Club..." />
          <CommandList>
            <CommandEmpty className=" text-muted/60 text-center py-6 font-normal text-sm  max-sm:text-xs">
              No club found
            </CommandEmpty>
            <CommandGroup>
              {musicClubs.map((club, idx) => (
                <CommandItem
                  key={`club-${idx}`}
                  value={club.id}
                  title={club.clubName}
                  onSelect={(currentValue) => {
                    setSelectedClub(
                      musicClubs.find((club) => club.id === currentValue) ||
                        null
                    );
                    setOpenClubSelector(false);
                  }}
                  className=" flex items-center justify-between gap-4  max-sm:text-xs"
                >
                  <div className=" flex items-center gap-1">
                    <IconCircleDashedCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedClub?.id === club.id
                          ? "opacity-100 text-gradient-start"
                          : "opacity-40 text-muted-foreground"
                      )}
                    />
                    <p className=" max-w-60 max-sm:max-w-32 truncate">{club.clubName}</p>
                  </div>
                  {club.iAmOwner ? (
                    <p className=" text-neutral-500">(creator)</p>
                  ) : (
                    <p className=" text-neutral-500">(member)</p>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
