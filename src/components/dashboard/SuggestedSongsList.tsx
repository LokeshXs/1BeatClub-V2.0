import React, {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { IconPlus } from "@tabler/icons-react";
import { getRelatedSongs } from "@/actions/GetRelatedSongs";
import { useSongs } from "@/store/useSongs";
import { addSongInClub } from "@/actions/addSong";
import { useMusicClubs } from "@/store/useMusicClubs";
import { toast } from "sonner";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";

export default function SuggestedSongsList() {
  const { webSocketClient } = useContext(WebSocketContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const listedSongs = useSongs((state) => state.listedSongs);
  const addNewSongToList = useSongs((state) => state.addNewSongToList);
  const selectedClub = useMusicClubs((state) => state.selectedClub);
  const [relatedSongs, setRelatedSongs] = useState<
    { title: string; videoId: string; thumbnail: string }[]
  >([]);
  const [userCountryCodeInfo, setUserCountryCodeInfo] = useState<{
    fetching: boolean;
    code: string | undefined;
  }>({ fetching: true, code: undefined });

  const fetchIpInfo = useCallback(async () => {
    const countryCodeFromLS = localStorage.getItem("countryCode");
    if (countryCodeFromLS) {
      return setUserCountryCodeInfo({
        fetching: false,
        code: countryCodeFromLS,
      });
    }

    //Fetching IP info
    const res = await axios.get("https://ipinfo.io", {
      params: {
        token: process.env.NEXT_PUBLIC_IPINFO_TOKEN,
      },
    });

    const data = res.data;

    if (res.status === 429) {
      return setUserCountryCodeInfo({
        fetching: false,
        code: "IN",
      });
    }

    const countryCode = data.country;
    setUserCountryCodeInfo({
      fetching: false,
      code: countryCode,
    });

    localStorage.setItem("countryCode", countryCode);
  }, []);

  const fetchRelatedSongs = useCallback(() => {
    startTransition(async () => {
      await fetchIpInfo();
      const res = await getRelatedSongs({
        regionCode: userCountryCodeInfo.code || "IN",
      });
      if (res.status === "success") {
        setRelatedSongs(res.relatedSongs);
      } else {
        setRelatedSongs([]);
      }
    });
  }, [fetchIpInfo, userCountryCodeInfo.code]);

  async function addSongToList(videoId: string) {
    startTransition(async () => {
      const response = await addSongInClub(
        { songlink: `https://www.youtube.com/watch?v=${videoId}` },
        selectedClub?.id || ""
      );

      if (response.status === "error" || !response.data) {
        toast.error(`Error: ${response.message}`);
      } else {
        addNewSongToList({ ...response.data, votes: [] });
        if (webSocketClient?.readyState === WebSocket.OPEN) {
          webSocketClient.send(
            JSON.stringify({
              type: "ADDSONG",
              data: { ...response.data, votes: [] },
            })
          );
        }
      }
    });
  }

  useEffect(() => {
   
      fetchRelatedSongs();
    
  }, [listedSongs, fetchRelatedSongs, userCountryCodeInfo.code]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          behavior: "smooth",
        });
      }
    };

    container.addEventListener(
      "wheel",
      (e) => {
        handleWheel(e);
      },
      { passive: false }
    );

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className=" flex items-center gap-6  overflow-x-auto py-2 "
    >
      {isPending
        ? Array(5)
            .fill(0)
            .map((_, idx) => (
              <Skeleton
                key={idx}
                className=" w-[300px] h-12 rounded-full bg-neutral-700"
              />
            ))
        : relatedSongs.map((data, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className=" flex items-center gap-2 w-[300px] bg-gradient-to-br from-gradient-start/20 via-gradient-via/20 to-gradient-end/20  p-2 rounded-full">
                <div className=" flex items-center gap-2">
                  <Avatar className=" w-12 h-12 " title={data.title}>
                    <AvatarImage
                      src={data.thumbnail}
                      alt={data.title}
                      className=" object-cover object-center"
                    />
                    <AvatarFallback>
                      {data.title.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <p className=" line-clamp-1" title={data.title}>
                    {data.title}
                  </p>
                </div>

                <Button
                  onClick={() => addSongToList(data.videoId)}
                  title="Add Song"
                  className="bg-gradient-to-br from-gradient-start/30 via-gradient-via/30 to-gradient-end/30  hover:from-gradient-start/40 hover:via-gradient-via/40 hover:to-gradient-end/40 transition-all duration-300 cursor-pointer rounded-full w-10 h-10 backdrop-blur-2xl group "
                >
                  <IconPlus className=" group-hover:-rotate-90 transition-all duration-300" />
                </Button>
              </div>
            </motion.div>
          ))}
    </div>
  );
}
