"use client"; // Error boundaries must be Client Components


import { Button } from "@/components/ui/button";

import { IconHomeFilled, IconRotate } from "@tabler/icons-react";
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
    <main className=" p-12 min-h-screen bg-background flex justify-center items-center bg-radial from-gradient-start/20 to-background ">
      <div className=" space-y-6">
        <h2 className=" text-4xl font-bold bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end text-transparent bg-clip-text p-6 text-center">
          Unable to connect. Please refresh the page!
        </h2>
        <div className=" flex items-center justify-center gap-12">
         <div className=" w-fit rounded-md p-[2px] bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end  ">
           <Button className=" bg-background hover:bg-background  [&_svg:not([class*='size-'])]:size-4   group min-w-[100px] hover:cursor-pointer">
            <p className=" bg-gradient-to-r from-gradient-start to-gradient-end  bg-clip-text text-transparent font-medium">
              {" "}
              Home
            </p>
            <IconHomeFilled />
          </Button>
         </div>

          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            className=" bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500 min-w-[100px]  hover:cursor-pointer  "
          >
            Try again
            <IconRotate />
          </Button>
        </div>
      </div>

    
    </main>
  );
}
