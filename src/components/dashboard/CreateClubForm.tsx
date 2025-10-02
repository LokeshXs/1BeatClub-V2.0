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
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import { Textarea } from "../ui/textarea";
import { IconConfettiFilled, IconPlus, IconX } from "@tabler/icons-react";
import { createClubFormSchema as formSchema } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { CURRENT_SERVER_URL, MAX_SIZE_MB } from "@/lib/config";
import Loader from "../ui/loaders/loader1/Loader";
import { CreateClubActionContext } from "@/context/CreateClubActionProvider";
import { useMusicClubs } from "@/store/useMusicClubs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

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
  const clubBannerRef = useRef<HTMLInputElement>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axios.post(
        `${CURRENT_SERVER_URL}/api/club/create`,
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

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ["image/png", "image/jpeg"]; // Only PNG and JPG/JPEG

    if (event.target.files) {
      const files = Array.from(event.target.files);
      // Checking if files are not more than 2
      if (files.length > 1) {
        form.setError("clubBanner", {
          message: "Maximum 1 image can be selected!",
        });
        return toast.error("Maximum 1 image can be selected");
      }

      if (event.target.files[0].size > MAX_SIZE_MB * 1024 * 1024) {
        form.setError("clubBanner", {
          message: "Club Image size must be under 5MB!",
        });
        return toast.error("Club Image size must be under 5MB");
      }

      // Checking if files are of either png or jpg type
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!allowedTypes.includes(file.type)) {
          form.setError("clubBanner", {
            message: "Invalid file type. Support only (png,jpg)",
          });
          return toast.error("Invalid file type. Support only (png,jpg)");
        }
      }

      form.setValue("clubBanner", files[0]);
      form.clearErrors("clubBanner");
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Dialog
      open={openCreateClubForm}
      onOpenChange={() => setOpenCreateClubForm((prev) => !prev)}
    >
      <DialogContent className="  inset-shadow-custom-hover  max-h-[500px] overflow-y-auto border border-muted-foreground   p-0 bg-radial-[80%_80%] from-gradient-start/10 to-background  ">
        {/* <div className=" flex flex-col items-center">
          <div className="  h-[200px]  w-full relative  overflow-hidden">
            <Image
              src="/assets/club-avatars/avatar.png"
              alt="club avatar"
              fill
              className=" object-cover object-center  "
            />
          </div>
        </div> */}

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
            {/* <FormField
              control={form.control}
              name="maximumMembers"
              render={({ field }) => (
                <FormItem className=" space-y-2">
                  <FormLabel>Maximum Members</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={1}
                      defaultValue={20}
                      placeholder="20"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      className=" w-[200px]  placeholder:text-neutral-500  h-10 border-gradient-end/40 hover:border-gradient-end/60 focus-visible:border-gradient-end focus-visible:ring-gradient-end/40 "
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="clubBanner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload your Club Banner Image</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        ref={clubBannerRef}
                        placeholder="Upload Photo"
                        multiple={true}
                        accept=".png, .jpg"
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                      {form.getValues().clubBanner ? (
                        <div className=" relative mt-4 w-fit h-fit p-1 rounded-md border-2 border-dashed border-gradient-end/40">
                          <Image
                            src={URL.createObjectURL(
                              form.getValues()?.clubBanner || new Blob()
                            )}
                            alt="Club Banner"
                            width={100}
                            height={100}
                            className=" rounded-sm "
                          />

                          <div
                            onClick={() =>
                              form.setValue("clubBanner", undefined)
                            }
                            className="p-1 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end rounded-full absolute -right-2 -top-2 cursor-pointer"
                          >
                            <IconX className=" w-3 h-3" />
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => clubBannerRef.current?.click()}
                          className="mt-2 w-full h-[140px] border-2  border-gradient-end/40 rounded-lg border-dashed  flex items-center justify-center cursor-pointer "
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end flex justify-center items-center rounded-full">
                            <IconPlus />
                          </div>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  {form.formState.errors.clubBanner && (
                    <p className=" text-red-500 text-sm">
                      {form.formState.errors.clubBanner?.message}
                    </p>
                  )}
                </FormItem>
              )}
            /> */}

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
