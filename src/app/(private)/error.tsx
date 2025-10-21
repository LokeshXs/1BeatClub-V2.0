"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";

import { IconHomeFilled, IconRotate } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className=" p-12 max-sm:p-4 min-h-screen bg-background flex justify-center items-center bg-radial from-gradient-start/20 to-background ">
      <div className=" space-y-6">
        <h2 className=" text-4xl max-sm:text-2xl font-bold bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end text-transparent bg-clip-text p-6 text-center">
          Unable to connect. Please refresh the page!
        </h2>
        <div className=" flex max-sm:flex-col  items-center justify-center gap-12 max-sm:gap-4">
          <div className=" w-fit rounded-md p-[2px] bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end  ">
            <Button
              asChild
              className=" bg-background hover:bg-background  [&_svg:not([class*='size-'])]:size-4   group min-w-[100px] hover:cursor-pointer"
            >
              <Link href="/">
                <p className=" bg-gradient-to-r from-gradient-start to-gradient-end  bg-clip-text text-transparent font-medium">
                  {" "}
                  Home
                </p>
                <IconHomeFilled />
              </Link>
            </Button>
          </div>

          <div className=" w-fit rounded-md p-[2px] bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end  ">
            <Button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
              className=" bg-background hover:bg-background  [&_svg:not([class*='size-'])]:size-4   group min-w-[100px] hover:cursor-pointer"
            >
              <p className=" bg-gradient-to-r from-gradient-start to-gradient-end  bg-clip-text text-transparent font-medium">
                {" "}
                Try again
              </p>
              <IconRotate />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
