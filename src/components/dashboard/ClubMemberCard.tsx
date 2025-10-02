import { MembersType } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useTransition } from "react";
import { removeMember } from "@/actions/removeMember";
import { useMusicClubs } from "@/store/useMusicClubs";
import { toast } from "sonner";
import Loader from "../ui/loaders/loader1/Loader";

export default function ClubMemberCard({
  member,
  setMembers,
}: {
  member: MembersType;
  setMembers: Dispatch<SetStateAction<MembersType[]>>;
}) {
  const [isPending, startTransition] = useTransition();
  const selectedClub = useMusicClubs((state) => state.selectedClub);

  const removeMemberHandler = async () => {
    startTransition(async () => {
      const res = await removeMember({
        clubId: selectedClub?.id || "",
        userId: member.user_id,
      });

      if (res.status === "error") {
        toast.error("Failed to remove the member!");
      } else {
        toast.success("Member is removed 🙈");
        setMembers((prev) =>
          prev.filter((value) => value.user_id !== member.user_id)
        );
      }
    });
  };

  return (
    <div className="py-2 px-4 flex justify-between  items-center gap-4 inset-shadow-custom-hover rounded-lg">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src={member.profileImage||undefined} className=" object-cover object-center" />
          <AvatarFallback className="bg-gradient-to-br from-gradient-start to-gradient-end">
            {member.name?.slice(1, 3).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm">{member.username}</p>
          <p className="text-xs text-neutral-400">{member.name}</p>
        </div>
      </div>

      <div>
        <Button
          onClick={removeMemberHandler}
          size="sm"
          className="bg-gradient-to-r from-gradient-start via-gradient-via to-gradient-end bg-[length:200%_100%] bg-right cursor-pointer flex items-center group hover:bg-[length:100%_100%] hover:bg-center transition-all duration-500 mx-auto text-sm min-w-[80px]"
          disabled={isPending}
        >
          {isPending ? <Loader width={14} height={14} /> : "Remove"}
        </Button>
      </div>
    </div>
  );
}
