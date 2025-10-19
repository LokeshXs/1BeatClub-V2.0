"use client";

import Link from "next/link";
import { useContext } from "react";
import { MobileNavContext } from "@/context/MobileNavContextProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import AnimatedHamburgerButton from "./AnimatedHamburger";
import { NAV_LINKS } from "@/lib/data";

const MobileNav = () => {
  const { isOpen, setOpen } = useContext(MobileNavContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ top: "100%", opacity: 0 }}
          animate={{ top: 0, opacity: 1 }}
          exit={{ top: "100%", opacity: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="fixed left-0 top-0 z-[12] h-screen  w-screen  text-primary-foreground flex justify-center items-center  overflow-y-auto bg-background bg-radial-[140%_100%_at_50%_100%] from-gradient-start/20  "
        >

          <div className=" absolute top-6 right-6">
            <AnimatedHamburgerButton />
          </div>
          <div className="  p-8 max-sm:p-6 ">
            <motion.ul
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3, // Delay between each li element
                  },
                },
              }}
              initial="hidden"
              animate={isOpen ? "visible" : ""}
              exit="hidden"
              className=" space-y-6"
            >
              <motion.li
                className=" text-2xl font-bold text-center"
                onClick={() => {
                  setOpen(false);
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <Button className=" rounded-full  bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end text-primary px-6 ">
                  <Link href="/sign-up" className=" text-primary-foreground text-xl">Sign Up</Link>
                </Button>
              </motion.li>

              {NAV_LINKS.map((navLink, index) => (
                <motion.li
                  key={`link-${index}`}
                  className=" text-2xl font-bold text-center"
                  onClick={() => {
                    setOpen(false);
                  }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <Link href={navLink.link}>{navLink.label}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
