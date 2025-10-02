"use client";
import { useContext } from "react";
import { Button } from "../ui/button";
import { IconConfettiFilled } from "@tabler/icons-react";
import { CreateClubActionContext } from "@/context/CreateClubActionProvider";

export default function CreateFirstClubButton() {
  const { setOpenCreateClubForm } = useContext(CreateClubActionContext);

  return (
    <Button
      onClick={() => setOpenCreateClubForm(true)}
      className="bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500  "
    >
      <IconConfettiFilled className=" group-hover:animate-bounce transform scale-x-[-1]" />
      Create Your First Club{" "}
      <IconConfettiFilled className=" group-hover:animate-bounce" />
    </Button>
  );
}
