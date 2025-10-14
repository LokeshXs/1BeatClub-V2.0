import {
  IconBrandBandlab,
  IconConfetti,
  IconPointerUp,
} from "@tabler/icons-react";

const bulletPoints = [
  {
    icon: IconBrandBandlab,
    title: "Unlimited Song Adds",
    desc: "Keep the music flowing with no limits on the songs you and your friends can add to the queue.",
  },
  {
    icon: IconConfetti,
    title: "Unlimited Clubs",
    desc: "Create as many music clubs as you want — one for the gym, another for parties, or even a private one with close friends.",
  },
  {
    icon: IconPointerUp,
    title: "Invite Friends Anytime",
    desc: "Easily share your club with friends through invites or QR codes — the more, the merrier.",
  },
];

export default function FreeSection() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto  relative  mt-40 max-md:mt-20 space-y-12 max-md:space-y-8 bg-radial-[50%_50%_at_50%_50%] from-gradient-via/20 to-transparent px-6 max-sm:px-4">
      <div className=" flex flex-col items-center gap-2">
        <h2 className=" text-6xl max-md:text-5xl max-sm:text-3xl max-w-5xl text-center font-semibold text-secondary-foreground leading-[1.2]">
          No Subscriptions. No Paywalls. Just{" "}
          <span className=" bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end text-transparent bg-clip-text font-extrabold">
            Music.
          </span>
        </h2>
        <p className=" text-lg text-subtext italic text-center max-sm:text-sm max-w-lg">
          1BeatClub is built for community. Enjoy unlimited music, invites, and
          vibes — always free
        </p>
      </div>

      <div className=" flex items-center max-md:flex-col justify-between gap-4 max-md:gap-6">
        {bulletPoints.map((pointObj, _) => (
          <div
            key={pointObj.title}
            className="p-[1px] bg-gradient-to-b from-transparent  via-gradient-via/80 via-80% to-gradient-end/80 w-fit rounded-lg max-md:w-full  "
          >
            <div className=" relative flex flex-col gap-6 justify-between bg-background/80 p-4 rounded-lg group min-h-[230px]  ">
              <span className=" block p-3 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end w-fit rounded-lg">
                <pointObj.icon className="size-8 max-md:size-6" />
              </span>
              <div className=" space-y-3 relative z-[2] ">
                <p className=" font-medium text-lg max-sm:text-base">{pointObj.title}</p>
                <p className="max-w-[360px] text-neutral-300 max-sm:text-sm ">{pointObj.desc}</p>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-transparent via-gradient-via/20 to-gradient-end/20 h-0 opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 z-0"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
