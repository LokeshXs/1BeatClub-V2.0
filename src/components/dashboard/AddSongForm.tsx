"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconMusicPlus } from "@tabler/icons-react";
import { useContext, useTransition } from "react";
import { WebSocketContext } from "@/context/WebSocketClientProvider";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";
import { addSongFormSchema as formSchema } from "@/lib/schema";
import { addSongInClub } from "@/actions/addSong";
import { useMusicClubs } from "@/store/useMusicClubs";
import Loader from "../ui/loaders/loader1/Loader";
import { useSongs } from "@/store/useSongs";
import { toast } from "sonner";

export function AddSongForm() {
  const { connectingWebSocket, webSocketClient } = useContext(WebSocketContext);
  const selectedClub = useMusicClubs((state) => state.selectedClub);
  const [isPending, startTransition] = useTransition();
  const addNewSongToList = useSongs((state) => state.addNewSongToList);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      songlink: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const response = await addSongInClub(values, selectedClub?.id || "");

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

        form.reset();
      }
    });
  }

  if (connectingWebSocket) {
    return <Skeleton className=" h-10 bg-neutral-600 " />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center max-sm:flex-col max-sm:gap-2 w-full gap-6"
        >
          <FormField
            control={form.control}
            name="songlink"
            render={({ field }) => (
              <FormItem className="flex-1  max-sm:w-full ">
                <FormControl>
                  <Input
                    placeholder="Paste youtube song link..."
                    disabled={isPending}
                    className="  flex-1 placeholder:text-neutral-500  h-10 max-sm:h-9 border-gradient-end/40 hover:border-gradient-end/60 focus-visible:border-gradient-end focus-visible:ring-gradient-end/40 selection:bg-gradient-start/60 max-sm:text-xs  "
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isPending}
            type="submit"
            className=" bg-gradient-to-br from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer flex items-center group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500  max-sm:h-8 max-sm:text-xs"
          >
            {isPending ? (
              <div className=" flex items-center gap-2">
                <Loader width={14} height={14} />
                Adding...
              </div>
            ) : (
              <div className=" flex items-center gap-1">
                Add Song{" "}
                <IconMusicPlus className=" group-hover:animate-bounce" />
              </div>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
