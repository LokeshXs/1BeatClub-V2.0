"use client";

import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { motion, stagger } from "motion/react";
import Image from "next/image";
import Lottie from "react-lottie";
import animationData from "@/../public/assets/lottie/music.json";
import SongCard from "../common/SongCard";
import SongCardHeroSection from "../common/SongCardHeroSection";
import Link from "next/link";
import { GridBeams } from "../ui/grid-beams";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function HeroSection() {
  const heroTitle = " Let the Crowd Pick  the Soundtrack";

  const parentVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5 },
    },
  };

  return (
    <GridBeams
      gridColor="rgba(255, 95, 151,0.2)"
      backgroundColor="#ffffff03"
      rayOpacity={0.2}
      raySpeed={0.5}
    >
      <motion.section
        initial={{
          backgroundImage: [
            "radial-gradient(120% 120% at 50% 0%, transparent 60%, #b656f0cc)",
          ],
          opacity: 0,
        }}
        animate={{
          backgroundImage: [
            "radial-gradient(120% 120% at 50% 0%, transparent 60%, #b656f0cc)",
            "radial-gradient(120% 120% at 50% 0%, transparent 60%, #ff5f97cc)",
            "radial-gradient(120% 120% at 50% 0%, transparent 60%, #e7727bcc)",
          ],
          opacity: 1,
        }}
        transition={{
          backgroundImage: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
          opacity: {
            duration: 1,
            ease: "easeInOut",
          },
        }}
        // style={{
        //   backgroundImage:"radial-gradient(110% 110% at 50% 0%, transparent 60%, #b656f0)"
        // }}
        className=" min-h-screen  relative flex justify-center items-center mt-12 max-sm:mt-0 max-sm:hidden    "
      >
        <div className=" px-6  flex flex-col items-center gap-8 pb-6 ">
          <motion.div
            initial={{ y: 40, filter: "blur(10px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className=" border border-muted-foreground bg-secondary px-4 rounded-full text-sm py-1 "
          >
            <p className=" bg-gradient-to-br from-gradient-start/80 via-gradient-via/80 to-gradient-end/80 text-transparent bg-clip-text max-md:text-sm">
              Turn Up the Music, Together 🎧
            </p>
          </motion.div>
          <motion.h1
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            className=" text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-4xl font-semibold  text-pretty text-center text-white  max-w-5xl"
          >
            {heroTitle.split(" ").map((word, idx) => (
              <motion.span
                variants={childVariants}
                key={`word-${idx}`}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.h1>

          <div className=" flex flex-col gap-1 items-center">
            <motion.p
              initial={{ y: 10, filter: "blur(10px)", opacity: 0 }}
              animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className=" text-lg max-sm:text-sm max-md:text-base text-center max-w-lg text-subtext "
            >
              Start a club, drop your favorite tracks, and watch the vibes take
              over — music’s just better together
            </motion.p>

            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className=" w-60"
            >
              <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
            </motion.div>
          </div>

          <div className=" flex flex-col items-center gap-4">
            <motion.div
              initial={{ y: 10, filter: "blur(10px)", opacity: 0 }}
              animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.3 }}
              className=" w-fit h-fit relative group"
            >
              <Link href="/sign-in">
                <Button className=" relative z-[2] bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center max-sm:text-sm  transition-all duration-500 font-medium min-w-40 group ">
                  Get Started For Free{" "}
                  <IconArrowRight className=" group-hover:translate-x-1 transition-all duration-200" />
                </Button>
              </Link>

              <div className=" z-0 absolute -bottom-2 inset-x-0 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end h-4 w-full rounded-full  blur-xl group-hover:opacity-100 opacity-0  transition-all duration-300" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mobile Hero Section */}
      <motion.section
        initial={{
          backgroundImage: [
            "radial-gradient(200% 120% at 50% 0%, transparent 60%, #b656f0cc)",
          ],
          opacity: 0,
        }}
        animate={{
          backgroundImage: [
            "radial-gradient(200% 120% at 50% 0%, transparent 60%, #b656f0cc)",
            "radial-gradient(200% 120% at 50% 0%, transparent 60%, #ff5f97cc)",
            "radial-gradient(200% 120% at 50% 0%, transparent 60%, #e7727bcc)",
          ],
          opacity: 1,
        }}
        transition={{
          backgroundImage: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
          opacity: {
            duration: 1,
            ease: "easeInOut",
          },
        }}
        // style={{
        //   backgroundImage:"radial-gradient(110% 110% at 50% 0%, transparent 60%, #b656f0)"
        // }}
        className=" min-h-screen  relative flex justify-center items-center mt-12 max-sm:mt-0  sm:hidden   "
      >
        <div className=" px-6  flex flex-col items-center gap-8 pb-6 ">
         <div className=" flex flex-col gap-2 items-center">
           <motion.div initial={{ y: 40, filter: "blur(10px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}>
            <a
              href="https://peerlist.io/lokeshs/project/1beatclub"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="https://peerlist.io/api/v1/projects/embed/PRJHKKDNG8KKB6K7KFQKOKN9KAAL98?showUpvote=false&theme=dark"
                alt="1Beatclub"
                unoptimized
                width={140}
                height={140}
              />
            </a>
          </motion.div>
          <motion.div
            initial={{ y: 40, filter: "blur(10px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className=" border border-muted-foreground bg-secondary px-4 rounded-full text-sm py-1 "
          >
            <p className=" bg-gradient-to-br from-gradient-start/80 via-gradient-via/80 to-gradient-end/80 text-transparent bg-clip-text max-md:text-sm">
              Turn Up the Music, Together 🎧
            </p>
          </motion.div>
         </div>
          <motion.h1
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            className=" text-8xl max-lg:text-7xl max-md:text-6xl max-sm:text-4xl font-semibold  text-pretty text-center text-white  max-w-5xl"
          >
            {heroTitle.split(" ").map((word, idx) => (
              <motion.span
                variants={childVariants}
                key={`word-${idx}`}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.h1>

          <div className=" flex flex-col gap-1 items-center">
            <motion.p
              initial={{ y: 10, filter: "blur(10px)", opacity: 0 }}
              animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
              className=" text-lg max-sm:text-sm max-md:text-base text-center max-w-lg text-subtext "
            >
              Start a club, drop your favorite tracks, and watch the vibes take
              over — music’s just better together
            </motion.p>

            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className=" w-60"
            >
              <Lottie options={defaultOptions} isClickToPauseDisabled={true} />
            </motion.div>
          </div>

          <div className=" flex flex-col items-center gap-4">
            <motion.div
              initial={{ y: 10, filter: "blur(10px)", opacity: 0 }}
              animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.3 }}
              className=" w-fit h-fit relative group"
            >
              <Link href="/sign-in">
                <Button className=" relative z-[2] bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center max-sm:text-sm  transition-all duration-500 font-medium min-w-40 group ">
                  Get Started For Free{" "}
                  <IconArrowRight className=" group-hover:translate-x-1 transition-all duration-200" />
                </Button>
              </Link>

              <div className=" z-0 absolute -bottom-2 inset-x-0 bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end h-4 w-full rounded-full  blur-xl group-hover:opacity-100 opacity-0  transition-all duration-300" />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </GridBeams>
  );
}
