"use client";

import Link from "next/link";
import { BorderBeam } from "../ui/BorderBeam";
import { Button } from "../ui/button";
import { motion } from "motion/react";

export default function CTASection() {
  return (
    <div className="px-6">
      <div className=" relative overflow-hidden max-w-7xl mx-auto mt-40 max-md:mt-20 p-6 inset-shadow-custom-hover rounded-xl border border-neutral-300/20  min-h-[300px] flex flex-col items-center justify-center gap-4 mb-10  ">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
        viewport={{
          once: true,
        }}
        className=" text-center text-4xl max-md:text-2xl font-semibold z-[2] "
      >
        Your Club.{" "}
        <span className=" bg-gradient-to-tr from-gradient-start via-gradient-via to-gradient-end text-transparent bg-clip-text">
          Your Music.
        </span>{" "}
        Your Vibe.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.2,
        }}
        viewport={{
          once: true,
        }}
        className=" text-subtext max-w-lg text-center text-pretty z-[2] max-sm:text-sm"
      >
        Join 1BeatClub today and create unforgettable music moments with your
        friends — whether it’s at the gym, a house party, or just chilling
        together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.3,
        }}
        viewport={{
          once: true,
        }}
        className=" relative group z-[2]"
      >
       <Link href="/sign-in">
        <Button className="mt-6 bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500 ">
          {" "}
          Create Your First Club
        </Button>
       </Link>

        <div className=" z-0 absolute -bottom-2 inset-x-0 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end h-4 w-full rounded-full  blur-xl group-hover:opacity-100 opacity-0  transition-all duration-300" />
      </motion.div>
      <BorderBeam
        duration={20}
        size={400}
        borderWidth={1}
        className="from-transparent via-gradient-start to-transparent"
      />
      <BorderBeam
        duration={20}
        delay={10}
        size={400}
        borderWidth={1}
        className="from-transparent via-gradient-via to-transparent"
      />
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
        viewport={{ once: true }}
        className="bg-radial-[80%_100%_at_50%_0%] from-gradient-via/20 to-transparent absolute top-0 inset-x-0 h-full z-0"
      />
    </div>
    </div>
  );
}
