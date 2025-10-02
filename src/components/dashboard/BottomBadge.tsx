import { IconBrandX } from "@tabler/icons-react";

export default function BottomBadge(){


    return (
        <div className=" fixed bottom-4 left-4 px-4 py-1 rounded-full flex items-center gap-4 max-sm:gap-2 border border-neutral-700 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:bottom-2  backdrop-blur-lg ">

            <p className=" text-xs max-sm:text-xs">
                Made By Lokesh
            </p>

            <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-gradient-via to-transparent"/>

            <div>
                <IconBrandX className=" w-4 h-4 max-sm:w-3 max-sm:h-3"/>
            </div>

        </div>
    )
}