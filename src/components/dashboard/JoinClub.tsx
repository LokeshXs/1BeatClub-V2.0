"use client";

import { useCallback, useEffect, useState } from "react";
import { Ripple } from "../common/Ripple";
import { addUserToClub } from "@/actions/addUserToClub";
import { Button } from "../ui/button";
import { IconLayoutDashboardFilled, IconRefreshDot } from "@tabler/icons-react";
import Link from "next/link";

export default function JoinClub({ clubId ,clubName}: { clubId: string, clubName:string }) {
  const [joiningClub, setJoiningClub] = useState(true);
  const [error, setError] = useState("");

  const joinClub = useCallback(async () => {
    const response = await addUserToClub(clubId);

    if (response.status === "error") {
      setError(response.message);
    }

    setJoiningClub(false);
  }, [clubId]);

  useEffect(() => {
    joinClub();
  }, [joinClub]);

  return (
    <div className=" w-full min-h-screen max-w-5xl mx-auto  p-6 flex justify-center items-center">
      {joiningClub ? (
        <JoiningState />
      ) : error ? (
        <ErrorState joinClub={joinClub} />
      ) : (
        <SuccessState clubName={clubName}  />
      )}
    </div>
  );
}

const JoiningState = () => {
  return (
    <div className="  relative h-[560px] w-full">
      <Ripple numCircles={4} mainCircleSize={300} />
      <p className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end text-transparent bg-clip-text">
        Joining Club...
      </p>
    </div>
  );
};

const ErrorState = ({ joinClub }: { joinClub: () => Promise<void> }) => {
  return (
    <div className=" flex flex-col items-center gap-6 ">
      <p className=" text-2xl font-semibold">
        Unable to add you to this club👎 Try again!
      </p>
      <div className="flex gap-6 items-center">
        <Button
          asChild
          className=" bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end min-w-[150px] bg-[length:200%_100%] bg-right  cursor-pointer hover:bg-center  hover:bg-[length:100%_100%]"
        >
          <Link href="/dashboard">
            {" "}
            Dashboard <IconLayoutDashboardFilled />
          </Link>
        </Button>
        <Button
          onClick={joinClub}
          className=" bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end min-w-[150px] bg-[length:200%_100%] bg-right  cursor-pointer hover:bg-center  hover:bg-[length:100%_100%]"
        >
          Retry <IconRefreshDot />
        </Button>
      </div>
    </div>
  );
};

const SuccessState = ({clubName}:{clubName:string}) => {
  return (
    <div className=" flex flex-col items-center gap-6 ">
      <span className=" text-2xl font-semibold  flex gap-2">
        <p>Boom💥 You’re now part of the club</p>{" "}
        <p className=" bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end text-transparent bg-clip-text font-bold">
          {clubName}
        </p>
      </span>
      <div className="flex gap-6 items-center">
        <Button
          asChild
          className=" bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end min-w-[150px] bg-[length:200%_100%] bg-right  cursor-pointer hover:bg-center  hover:bg-[length:100%_100%]"
        >
          <Link href="/dashboard">
            {" "}
            Dashboard <IconLayoutDashboardFilled />
          </Link>
        </Button>
      </div>
    </div>
  );
};
