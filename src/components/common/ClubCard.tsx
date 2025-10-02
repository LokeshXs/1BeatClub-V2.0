import Image from "next/image";

export default function ClubCard(){

    return (
             <div className="p-[1px] bg-gradient-to-br from-gradient-start/80 via-gradient-via/40 to-gradient-end/80 rounded-xl relative group/child">
          <div className="   p-3 rounded-xl bg-background">
            <div className=" z-[2] w-[200px] h-[200px] relative rounded-lg overflow-hidden">
              <Image
                src="/assets/sample-club.jpg"
                alt="Some club"
                fill
                className=" object-cover object-center"
              />
            </div>

            <div className="relative z-[2] flex flex-col items-center gap-2 mt-4">
              <p className=" font-medium">Peerlist Vibers</p>
              <p className=" text-sm text-subtext">
                <span className=" bg-gradient-to-br from-gradient-end via-gradient-via to-gradient-start text-transparent bg-clip-text font-medium">
                  10+
                </span>{" "}
                Members
              </p>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-transparent via-gradient-via/20 to-gradient-end/20 h-0 opacity-0 group-hover/child:opacity-100 group-hover/child:h-full transition-all duration-300 z-0"></div>
          </div>
        </div>
    )
}