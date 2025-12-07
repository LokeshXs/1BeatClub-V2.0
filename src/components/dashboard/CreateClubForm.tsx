"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, {
  useContext,
} from "react";
import { Textarea } from "../ui/textarea";
import { IconConfettiFilled } from "@tabler/icons-react";
import { createClubFormSchema as formSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Loader from "../ui/loaders/loader1/Loader";
import { CreateClubActionContext } from "@/context/CreateClubActionProvider";
import { useMusicClubs } from "@/store/useMusicClubs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function CreateClubForm() {
  const { openCreateClubForm, setOpenCreateClubForm } = useContext(
    CreateClubActionContext
  );
  const { addNewClub, musicClubs, setSelectedClub } = useMusicClubs();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clubName: "",
      description: "",
      maximumMembers: 20,
    },
  });

  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post(
        `/api/club/create`,
        {
          clubName: values.clubName,
          description: values.description,
          maximumMembers: values.maximumMembers,
        }
      );

      const data = response.data;

      toast.success("Club is launched successfully 🎉");

      if (musicClubs.length === 0) {
        router.refresh();
        addNewClub({ ...data.newClub, iAmOwner: true });
        setSelectedClub({ ...data.newClub, iAmOwner: true });
      } else {
        addNewClub({ ...data.newClub, iAmOwner: true });
        setSelectedClub({ ...data.newClub, iAmOwner: true });
      }

      return data;
    },

    onSuccess: (data) => {
      form.reset();
      setOpenCreateClubForm(false);
    },
    onError: (error: AxiosError) => {
      console.log(error);

      const data = error.response?.data as { message: string; status: string };

      toast.error(`Error: ${data.message || "Error in launching club!"}`);
    },
  });

 

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Dialog
      open={openCreateClubForm}
      onOpenChange={() => setOpenCreateClubForm((prev) => !prev)}
    >
      <DialogContent className="  inset-shadow-custom-hover  max-h-[500px] overflow-y-auto border border-muted-foreground   p-0 bg-radial-[80%_80%] from-gradient-start/10 to-background  ">
     

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 p-6 "
          >
            <FormField
              control={form.control}
              name="clubName"
              render={({ field }) => (
                <FormItem className=" space-y-2">
                  <FormLabel>Club Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Welcome Home Beats"
                      {...field}
                      className="  flex-1 placeholder:text-neutral-500  h-10 border-gradient-end/40 hover:border-gradient-end/60  focus-visible:border-gradient-end focus-visible:ring-gradient-end/40 selection:bg-gradient-start/60 max-sm:text-sm max-sm:h-9 "
                      disabled={isPending}
                    />
                  </FormControl>
                  <div className=" space-y-1">
                    <FormDescription className=" text-neutral-500 text-xs">
                      Must be less than 40 characters
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className=" space-y-2">
                  <FormLabel>
                    Description <p className="text-neutral-500">(optional)</p>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A cozy club for our housewarming bash — add your go-to dance tracks and singalongs!"
                      {...field}
                      className="  flex-1 placeholder:text-neutral-500  h-10 border-gradient-end/40 hover:border-gradient-end/60 focus-visible:border-gradient-end focus-visible:ring-gradient-end/40 selection:bg-gradient-start/60 max-sm:text-sm"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            

            <Button
              type="submit"
              className=" bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group w-full hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500 max-sm:text-sm   "
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2 ">
                  <Loader width={14} height={14} /> Launching Club...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Launch Club
                  <IconConfettiFilled className=" group-hover:animate-bounce" />
                </span>
              )}
              <span className="flex items-center "></span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(CreateClubForm);
