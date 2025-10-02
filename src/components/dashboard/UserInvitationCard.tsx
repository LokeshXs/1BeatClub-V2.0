import { UserInviteType } from "@/lib/types";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { processInvite } from "@/actions/processInvite";
import Loader from "../ui/loaders/loader1/Loader";
import { useMusicClubs } from "@/store/useMusicClubs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useInvitations } from "@/store/useInvitations";

export default function UserInvitationCard({
  invitation,
  setInvites,
}: {
  invitation: UserInviteType;
  setInvites: Dispatch<SetStateAction<UserInviteType[]>>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const addNewClub = useMusicClubs((state) => state.addNewClub);
  const setSelectedClub = useMusicClubs((state) => state.setSelectedClub);
  const decrementCount = useInvitations((state) => state.decrementCount);

  const handlerInvitationAction = async (actionType: "ACCEPT" | "DECLINE") => {
    startTransition(async () => {
      const res = await processInvite(invitation, actionType);

      if (res.status) {
        if (actionType === "ACCEPT") {
          if (res.joinedMusicClub) {
            router.refresh();
            addNewClub(res.joinedMusicClub);
            setSelectedClub(res.joinedMusicClub);
          }
          toast.success("Invitation Accepted");
        } else {
          toast.success("Invitation Declined");
        }

        setInvites((prev) =>
          prev.filter((value) => value.id !== invitation.id)
        );

        decrementCount();
      } else {
        toast.error(`Error: ${res.message}`);
      }
    });
  };

  return (
    <div className=" flex items-center justify-between gap-6 px-4 py-2 inset-shadow-custom-hover rounded-lg">
      <div className=" space-y-1">
        <p className=" text-primary-foreground text-sm max-sm:text-xs">
          Invite from{" "}
          <span className=" font-bold">{invitation.clubOwnerUserName}</span>
        </p>
        <p className=" font-bold bg-gradient-to-tr from-gradient-start via-gradient-via to-gradient-end bg-clip-text text-transparent text-sm max-sm:text-xs">
          {invitation.clubName}
        </p>
      </div>

      {isPending ? (
        <Loader width={14} height={14} />
      ) : (
        <div className=" flex items-center gap-2">
          <Button
            onClick={() => handlerInvitationAction("ACCEPT")}
            disabled={isPending}
            title="Accept"
            className=" rounded-full w-6 h-6 inset-shadow-[0px_0px_4px_rgba(34,197,94,0.8)] hover:inset-shadow-[0px_0px_8px_rgba(34,197,94,0.8)] text-green-600 hover:text-green-500 transition-all duration-100"
          >
            <IconCheck />
          </Button>

          <Button
            onClick={() => handlerInvitationAction("DECLINE")}
            title="Decline"
            disabled={isPending}
            className=" rounded-full w-6 h-6 inset-shadow-[0px_0px_4px_rgba(251,44,54,0.8)] hover:inset-shadow-[0px_0px_8px_rgba(251,44,54,0.8)] text-red-600 hover:text-red-500 transition-all duration-100"
          >
            <IconX />
          </Button>
        </div>
      )}
    </div>
  );
}
