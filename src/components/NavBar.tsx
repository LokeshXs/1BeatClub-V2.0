"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { NAV_LINKS } from "@/lib/data";
import AnimatedHamburgerButton from "./common/AnimatedHamburger";
import MobileNav from "./common/MobileNav";
import MobileNavContextProvider from "@/context/MobileNavContextProvider";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

export default function NavBar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  return (
    <MobileNavContextProvider>
      <div
        className={cn("  bg-transparent fixed top-0 w-full z-10 px-4  ", {
          hidden:
            pathname.startsWith("/dashboard") ||
            pathname.startsWith("/club-invite") ||
            pathname.startsWith("/sign-in") ||
            pathname.startsWith("/sign-up"),
        })}
      >
        <motion.nav
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="  max-w-7xl w-[60%] max-lg:w-[80%] max-sm:w-[100%] mx-auto  flex justify-between items-center p-2   rounded-xl mt-4 border-[1px] border-muted-foreground bg-secondary backdrop-blur-xl "
        >
          <Link href="/">
            <Image
              src="/assets/logo.png"
              alt="1BeatClub Logo"
              width={100}
              height={100}
              className="max-sm:w-[80px]"
            />
          </Link>

          <div className=" flex items-center gap-6 ">
            <ul className=" flex items-center gap-4 font-normal max-md:hidden">
              {NAV_LINKS.map((linkObj, _) => (
                <li key={linkObj.label}>
                  <Link
                    href={linkObj.link}
                    className=" text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {linkObj.label}
                  </Link>
                </li>
              ))}
            </ul>

            <span className=" inline-block h-8 w-[1px] bg-gradient-to-b from-transparent via-gradient-start to-transparent rounded-full max-md:hidden" />

            {isSignedIn ? (
              <Button
                asChild
                size="sm"
                className=" bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500   min-w-20  "
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <div className=" flex items-center gap-4">
                <Button
                  asChild
                  size="sm"
                  className=" inset-shadow-custom-hover  transition-all duration-500   min-w-20 border-[1px] border-muted-foreground hover:border-white/50 hover:shadow-[inset_0px_0px_15px_rgba(255,248,248,0.2)]  max-md:hidden "
                >
                  <Link
                    href="/sign-up"
                    className="bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end text-transparent bg-clip-text"
                  >
                    Sign Up
                  </Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className=" bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500   min-w-20  "
                >
                  <Link href="/sign-in">Login</Link>
                </Button>
                <AnimatedHamburgerButton />
              </div>
            )}
          </div>
          <MobileNav />
        </motion.nav>
        {/* <div className=" absolute h-[1px]  left-0 inset-x-0 bg-gradient-to-r from-gradient-end/20 via-gradient-via/30 to-gradient-end/20" /> */}
      </div>
    </MobileNavContextProvider>
  );
}
