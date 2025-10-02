
import { Marquee } from "../ui/Marquee";
import { TESTIMONIALS } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function TestimonilaSection() {
  return (
    <section className="  relative  mx-auto mt-40 max-md:mt-20">
      <div className="  mx-auto    px-6 max-sm:px-2 space-y-12 max-md:space-y-8 ">
        <div className=" flex flex-col items-center gap-2">
          <h2 className=" text-4xl max-sm:text-2xl text-center font-semibold text-secondary-foreground">
            What Our Users Say
          </h2>
          <p className=" text-lg text-subtext italic text-center max-sm:text-sm max-w-lg">
            Real voices. Real experiences. Discover how our platform is changing
            the way people enjoy music together.
          </p>
        </div>
        <div className=" space-y-6">
          <Marquee className="[--duration:120s] " pauseOnHover>
            {TESTIMONIALS.map((test, idx) => (
              <ReviewCard key={`test-${idx}`} {...test} />
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:100s] " pauseOnHover>
            {TESTIMONIALS.map((test, idx) => (
              <ReviewCard key={`test-${idx}`} {...test} />
            ))}
          </Marquee>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      </div>
    </section>
  );
}

const ReviewCard = ({
  img,
  name,

  body,
}: {
  img: string;
  name: string;

  body: string;
}) => {
  return (
    <div className="p-2 border-[1px] border-neutral-600/60 rounded-lg">
      <figure className=" bg-secondary p-4 border-px rounded-md border border-neutral-600/50 h-[200px] w-[400px] max-sm:w-[300px]  flex flex-col justify-between gap-4">
        <blockquote className="mt-2 text-base  p-2 text-[#72728b] rounded-lg line-clamp-4 max-sm:text-sm">
          {body}
        </blockquote>
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center gap-2">
            <Avatar className=" w-8 h-8">
              <AvatarImage src={img} alt={name} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <figcaption className="text-sm font-medium  text-primary-foreground  ">
              {name}
            </figcaption>
          </div>
        </div>
      </figure>
    </div>
  );
};
