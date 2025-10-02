"use client";

import { WebSocketContext } from "@/context/WebSocketClientProvider";
import { useInvitations } from "@/store/useInvitations";
import { useSongs } from "@/store/useSongs";
import { useUser } from "@clerk/nextjs";
import { useContext, useEffect } from "react";

export default function WebSocketManager() {
  const { webSocketClient } = useContext(WebSocketContext);
  const { user } = useUser();
 const incrementCount= useInvitations(state=>state.incrementCount);
  const {
    skipToNextSong,
    addNewSongToList,
    upvoteSong,
    downvoteSong,
    removeSongFromList,
  } = useSongs();

  // useEffect to handle Websocket events
  useEffect(() => {
    if (webSocketClient?.readyState === WebSocket.OPEN) {
      webSocketClient.onmessage = (message) => {
        const messageData = JSON.parse(message.data);

        if (messageData?.type === "SONGCHANGE") {
          //  listening for Websocket "SONGCHANGE" Event
          skipToNextSong();
        } else if (messageData?.type === "ADDSONG") {
          // listen for Websocket "ADDSONG" Event
          addNewSongToList(messageData.data);
        } else if (messageData?.type === "UPVOTE") {
          upvoteSong(messageData?.data.userId, messageData?.data.songId);
        } else if (messageData?.type === "DOWNVOTE") {
          downvoteSong(messageData?.data.userId, messageData?.data.songId);
        } else if (messageData?.type === "REMOVESONG") {
          removeSongFromList(messageData?.data.songId);
        } else if (messageData?.type === "INVITE") {
          if(messageData?.data.to_userId === user?.id){
            incrementCount();
          }
        
        }
      };
    }
  }, [
    skipToNextSong,
    webSocketClient,
    addNewSongToList,
    downvoteSong,
    upvoteSong,
    removeSongFromList,
    incrementCount,
    user?.id
  ]);

  return null;
}
