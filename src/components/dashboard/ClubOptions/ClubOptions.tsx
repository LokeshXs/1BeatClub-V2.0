"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import {
  IconBell,
  IconBellFilled,
  IconMenu2,
  IconMusicPlus,
  IconPlus,
  IconQrcode,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import CreateClubForm from "../CreateClubForm";
import InviteUserForm from "../InviteUserForm";
import UserInvitesModal from "../UserInvitesPanel";
import ClubSelector from "./ClubSelector";
import { CreateClubActionContext } from "@/context/CreateClubActionProvider";
import { useMusicClubs } from "@/store/useMusicClubs";
import MembersModal from "../MembersModal";
import { useInvitations } from "@/store/useInvitations";
import QrCodeModal from "../QrCodeModal";
import LeaveClub from "./LeaveClub";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ClubOptions({
  pendingInvitationsCount,
}: {
  pendingInvitationsCount: number;
}) {
  const { setOpenCreateClubForm } = useContext(CreateClubActionContext);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);
  const [openUserInvitesModal, setOpenUserInvitesModal] = useState(false);
  const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
  const selectedMusicClub = useMusicClubs((state) => state.selectedClub);
  const musicClubs = useMusicClubs((state) => state.musicClubs);
  const [openMembersModal, setOpenMembersModal] = useState(false);
  const { count, setCount } = useInvitations();

  useEffect(() => {
    setCount(pendingInvitationsCount);
  }, [setCount, pendingInvitationsCount]);

  return (
    <div className="flex items-center justify-between ">
      <div className=" flex items-center gap-2">
        <ClubSelector />
        {selectedMusicClub && selectedMusicClub.iAmOwner && (
          <Button
            title="Members"
            onClick={() => setOpenMembersModal(true)}
            className=" [&_svg:not([class*='size-'])]:size-4   p-2 group inset-shadow-custom hover:inset-shadow-custom-hover "
          >
            <IconUsers />
          </Button>
        )}
        {musicClubs.length > 0 &&
          selectedMusicClub &&
          !selectedMusicClub.iAmOwner && <LeaveClub />}
      </div>

      <div className=" flex items-center gap-4 max-md:hidden">
        <Button
          onClick={() => {
            setOpenCreateClubForm(true);
          }}
          className=" [&_svg:not([class*='size-'])]:size-4 inset-shadow-custom hover:inset-shadow-custom-hover p-2 group"
        >
          <p className=" bg-gradient-to-r from-gradient-start to-gradient-end  bg-clip-text text-transparent font-medium">
            {" "}
            Create Club
          </p>
          <IconMusicPlus />
        </Button>
        {selectedMusicClub && selectedMusicClub.iAmOwner && (
          <Button
            onClick={() => setOpenInviteUserModal(true)}
            className=" [&_svg:not([class*='size-'])]:size-4 inset-shadow-custom hover:inset-shadow-custom-hover p-2 group"
          >
            <IconUserPlus />
          </Button>
        )}
        {selectedMusicClub && selectedMusicClub.iAmOwner && (
          <Button
            onClick={() => setOpenQrCodeModal(true)}
            className=" [&_svg:not([class*='size-'])]:size-6 inset-shadow-custom hover:inset-shadow-custom-hover p-2 group"
          >
            <IconQrcode />
          </Button>
        )}
        <Button
          onClick={() => setOpenUserInvitesModal(true)}
          className=" [&_svg:not([class*='size-'])]:size-6 inset-shadow-custom hover:inset-shadow-custom-hover p-2 group relative "
        >
          <IconBellFilled />

          <span className=" absolute top-0 right-2 z-10 bg-gradient-to-br  from-gradient-start to-gradient-end h-4 w-4 rounded-full text-[8px] flex items-center justify-center group-hover:animate-pulse">
            {count}
          </span>
        </Button>
      </div>

      <div className="hidden max-md:block">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconMenu2 />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" divide-y divide-muted/20">
            {selectedMusicClub && selectedMusicClub.iAmOwner && (
              <DropdownMenuItem
                onClick={() => setOpenInviteUserModal(true)}
                className=" flex justify-between [&_svg:not([class*='size-'])]:size-3"
              >
                <p>Invite</p>{" "}
                <span className="p-1 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end rounded-full">
                  <IconUserPlus className=" text-primary-foreground " />
                </span>{" "}
              </DropdownMenuItem>
            )}

            {selectedMusicClub && selectedMusicClub.iAmOwner && (
              <DropdownMenuItem
                onClick={() => setOpenQrCodeModal(true)}
                className=" flex justify-between [&_svg:not([class*='size-'])]:size-3"
              >
                <p>Invite QR</p>{" "}
                <span className="p-1 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end rounded-full">
                  <IconQrcode className=" text-primary-foreground " />
                </span>{" "}
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => setOpenUserInvitesModal(true)}
              className=" flex justify-between [&_svg:not([class*='size-'])]:size-3"
            >
              <p>Notifications</p>{" "}
              <span className="p-1 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end rounded-full">
                <IconQrcode className=" text-primary-foreground " />
              </span>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setOpenCreateClubForm(true);
              }}
              className=" flex justify-between [&_svg:not([class*='size-'])]:size-3"
            >
              <p>Create Club </p>{" "}
              <span className="p-1 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end rounded-full">
                <IconBell className=" text-primary-foreground " />
              </span>{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CreateClubForm />

      <InviteUserForm
        open={openInviteUserModal}
        setOpen={setOpenInviteUserModal}
      />

      <UserInvitesModal
        open={openUserInvitesModal}
        setOpen={setOpenUserInvitesModal}
      />

      <MembersModal
        openMembersModal={openMembersModal}
        setOpenMembersModal={setOpenMembersModal}
      />

      <QrCodeModal open={openQrCodeModal} setOpen={setOpenQrCodeModal} />
    </div>
  );
}
