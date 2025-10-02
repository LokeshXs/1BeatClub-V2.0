"use client";

import { WEBSOCKET_SERVER_URL } from "@/lib/config";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type InitialStateType = {
  webSocketClient: WebSocket | null;
  connectingWebSocket: boolean;
  isWebSocketConnected: boolean;
};

export const WebSocketContext = createContext<InitialStateType>({
  webSocketClient: null,
  connectingWebSocket: true,
  isWebSocketConnected: false,
});

export default function WebSocketClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wsClientRef = useRef<WebSocket>(null);
  const pathname = usePathname();
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);
  const [connectingWebSocket, setConnectingWebSocket] = useState<boolean>(true);
  const [isWebSocketConnected, setIsWebSocketConnected] =
    useState<boolean>(false);
  const [wsError, setWsError] = useState<Error | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const connectToWebSocketServer = useCallback((user_id: string) => {
    // Initializing the WebSocket
    const ws = new WebSocket(`${WEBSOCKET_SERVER_URL}?userid=${user_id}`);

    // Event handler when Websocket connection opens
    ws.onopen = () => {
      wsClientRef.current = ws;
      setWsClient(ws);
      setConnectingWebSocket(false);
      setIsWebSocketConnected(true);
      setWsError(null);
      console.log("Websocket connected");
    };

    // Event handler when Websocket connection closes
    ws.onclose = () => {
      wsClientRef.current = null;
      setWsClient(null);
      setIsWebSocketConnected(false);
      console.log("Websocket connection is closed");
    };

    // Event handler when WebSocket errors
    ws.onerror = () => {
      ws.close();
      console.log("WebSocket connection is closing to Due to Error!");
      setWsError(new Error("WebSocket connection is closing to Due to Error!"));
    };
  }, []);

  //   UseEffect handling connecting to Websocket server when path is /dashboard
  useEffect(() => {
    console.log(pathname);
    if (user && pathname === "/dashboard") {
      connectToWebSocketServer(user.id);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          if (wsClient?.readyState !== WebSocket.OPEN) {
            // Reconnecting after tab focus
            connectToWebSocketServer(user.id);
          }
        }
      });
    }

    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.close();
      }
    };
  }, [connectToWebSocketServer, user, pathname]);

  //   Todo: Add a case when user changes the Club

  // useEffect to ping to Websocket server every 10sec to maintain the connection
  useEffect(() => {
    let pingInterval: NodeJS.Timeout;

    if (wsClient) {
      pingInterval = setInterval(() => {
        wsClientRef.current?.send(JSON.stringify({ type: "ping" }));
      }, 10000);
    }

    return () => clearInterval(pingInterval);
  }, [wsClient]);

  if (wsError) {
    throw wsError;
  }

  return (
    <WebSocketContext.Provider
      value={{
        webSocketClient: wsClientRef.current,
        connectingWebSocket,
        isWebSocketConnected,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}
