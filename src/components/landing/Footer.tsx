"use client";

import { cn } from "@/lib/utils";
import { IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PRODUCT_LINKS = [
  { name: "Contact us", href: "/contactus" },
  { name: "Pricing", href: "/#pricing" },
];

const LEGAL_LINKS = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const SOCIAL_LINKS = [
  { name: "Twitter", href: "/privacy", icon: IconBrandX },
  { name: "Linked in", href: "/terms", icon: IconBrandLinkedin },
];
export default function Footer() {

    const pathname = usePathname();
  return (
    <footer className={cn("mt-40 max-md:mt-20 px-6 bg-radial-[100%_100%_at_50%_100%] from-gradient-start/20",{
        "hidden":pathname!=="/"
    })}>
      <div className=" max-w-7xl mx-auto py-12 flex items-center max-md:flex-col max-md:items-start max-md:gap-8  justify-between">
        <div>
          <p className=" text-6xl max-lg:text-5xl max-md:text-4xl font-bold bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end text-transparent bg-clip-text ">
            1BeatClub
          </p>
        </div>
        <div className=" flex gap-14 max-md:flex-col max-md:gap-8">
          <div className=" space-y-4 ">
            <p className=" font-medium">Product</p>
            <ul className=" space-y-2">
              {PRODUCT_LINKS.map((linkObj, idx) => (
                <li
                  key={linkObj.name}
                  className=" text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  <Link href={linkObj.href}>{linkObj.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" space-y-4">
            <p className=" font-medium">Legal</p>
            <ul className=" space-y-2">
              {LEGAL_LINKS.map((linkObj, idx) => (
                <li
                  key={linkObj.name}
                  className=" text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  <Link href={linkObj.href}>{linkObj.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" space-y-4">
            <p className=" font-medium">Socials</p>
            <ul className=" space-y-2">
              {SOCIAL_LINKS.map((linkObj, idx) => (
                <li
                  key={linkObj.name}
                  className=" text-sm text-primary-foreground/80 hover:text-primary-foreground "
                >
                  <Link href={linkObj.href} className="flex items-center gap-1">
                    <linkObj.icon className="w-5 h-5" />
                    {linkObj.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className=" max-w-7xl mx-auto w-[80%] h-[1px] bg-gradient-to-r from-transparent via-gradient-via to-transarent" />
      <div className=" max-w-7xl mx-auto py-6 flex justify-between max-md:flex-col max-md:items-center max-md:gap-1">
        <p className=" text-xs">
          © {new Date().getFullYear()} 1BeatClub. All rights reserved.
        </p>
        <p className=" text-xs">
          Product by{" "}
          <Link
            href="https://lokesh-singh.vercel.app/"
            className=" font-semibold"
          >
            Lokesh Singh
          </Link>
        </p>
      </div>
    </footer>
  );
}
