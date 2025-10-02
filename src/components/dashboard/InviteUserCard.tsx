import { InviteUserType } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Loader from "../ui/loaders/loader1/Loader";
import { useContext, useTransition } from "react";
import { useMusicClubs } from "@/store/useMusicClubs";
import { inviteUser } from "@/actions/inviteUser";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { WebSocketContext } from "@/context/WebSocketClientProvider";

export default function InviteUserCard({ user }: { user: InviteUserType }) {
  const [isPending, startTransition] = useTransition();
  const selectedClub = useMusicClubs((state) => state.selectedClub);
  const { user: loggedInUser } = useUser();
  const { webSocketClient } = useContext(WebSocketContext);

  function inviteUserHandler(user: InviteUserType) {
    const actionType = user.status === "PENDING" ? "DELETE" : "INVITE";
    startTransition(async () => {
      const res = await inviteUser(
        user,
        actionType,
        selectedClub?.id || "",
        selectedClub?.clubName || "",
        loggedInUser?.username || ""
      );
      if (res.status === "success") {
        toast.success(res.message);
        user.status = actionType === "INVITE" ? "PENDING" : "";

        // sending websocket event to user who is invited
        if (actionType === "INVITE") {
          if (webSocketClient) {
            webSocketClient.send(
              JSON.stringify({
                type: "INVITE",
                data: {
                  to_userId: user.user_id,
                },
              })
            );
          }
        }
      } else {
        toast.error("Error: Error in sending invitation!");
      }
    });
  }

  return (
    <div
      key={user.email}
      className="py-2 px-4 max-sm:px-2 flex justify-between  items-center gap-4 inset-shadow-custom-hover rounded-lg"
    >
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8 ">
          <AvatarImage src={user.profileImg||undefined} className=" object-cover object-center" />
          <AvatarFallback className="bg-gradient-to-br from-gradient-start to-gradient-end">
            {user.name?.slice(1, 3).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm ">{user.username}</p>
          <p className="text-xs text-neutral-400">{user.name}</p>
        </div>
      </div>

      <div>
        {user.status === "ACCEPTED" ? (
          <span className=" flex items-center gap-1">
            <p className=" text-sm font-medium text-transparent bg-gradient-to-br from-gradient-start to-gradient-end bg-clip-text">
              Member
            </p>{" "}
            🔥
          </span>
        ) : (
          <Button
            onClick={() => {
              inviteUserHandler(user);
            }}
            size="sm"
            className="bg-gradient-to-r from-gradient-start via-gradient-via to-gradient-end bg-[length:200%_100%] bg-right cursor-pointer flex items-center group hover:bg-[length:100%_100%] hover:bg-center transition-all duration-500 mx-auto text-sm min-w-[80px]"
            disabled={isPending}
          >
            {isPending ? (
              <Loader width={14} height={14} />
            ) : user.status === "PENDING" ? (
              "Delete"
            ) : (
              "Invite"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
