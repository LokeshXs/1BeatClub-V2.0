import ReactQueryProvider from "@/context/ReactQueryProvider";
import WebSocketClientProvider from "@/context/WebSocketClientProvider";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import {
  IconCheck,
  IconExclamationMark,
} from "@tabler/icons-react";
import Footer from "@/components/landing/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WebSocketClientProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
      
      <Toaster
        position="top-center"
        theme="dark"
        richColors={true}
        toastOptions={{
          style: {
            background: "linear-gradient(45deg,#b656f0,#ff5f97,#e7727b)",
            color: "#fff",
          },
        }}
        icons={{
          success: (
            <span className="p-[2px] rounded-full flex justify-center items-center bg-green-500 ">
              <IconCheck className="text-white w-4 h-4" />
            </span>
          ),
          error: (
            <span className="p-[2px] rounded-full flex justify-center items-center bg-red-500 ">
              <IconExclamationMark className="text-white w-4 h-4" />
            </span>
          ),
        }}
      />
    </WebSocketClientProvider>
  );
}
