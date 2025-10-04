"use client";

import { motion } from "motion/react";
import Image from "next/image";
export default function DashboardSection() {
  return (
    <motion.section
      animate={{
        backgroundImage: [
          "radial-gradient(120% 120% at 50% 100%, transparent 60%, #b656f0cc)",
          "radial-gradient(120% 120% at 50% 100%, transparent 60%, #ff5f97cc)",
          "radial-gradient(120% 120% at 50% 100%, transparent 60%, #e7727bcc)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      // style={{
      //   backgroundImage:"radial-gradient(110% 110% at 50% 0%, transparent 60%, #b656f0)"
      // }}
      className="   relative flex justify-center items-center px-6 "
    >
      <motion.img
        initial={{ y: 10, filter: "blur(10px)", opacity: 0 }}
        animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.3 }}
        src="/assets/images/dashboard.png"
        alt="1Beatclub's dashboard"
        width={1200}
        height={1200}
        className=" rounded-md  -translate-y-24 max-sm:hidden "
      />
       <motion.img
        initial={{ y: 10, filter: "blur(10px)", opacity: 0 }}
        animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.3 }}
        src="/assets/images/mobile-dash.png"
        alt="1Beatclub's dashboard"
        width={600}
        height={600}
        className=" rounded-md  -translate-y-24 sm:hidden  mask-b-from-[60%] "
      />
    </motion.section>
  );
}
