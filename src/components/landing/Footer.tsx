"use client";

import { cn } from "@/lib/utils";
import { IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PRODUCT_LINKS = [
  { name: "Contact us", href: "/contact" },
  { name: "Pricing", href: "/#pricing" },
];

const LEGAL_LINKS = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://x.com/singh_loke28577", icon: IconBrandX },
  {
    name: "Linked in",
    href: "https://www.linkedin.com/in/lokeshsingh1129/",
    icon: IconBrandLinkedin,
  },
];
export default function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className={cn(
        "mt-40 max-md:mt-20 px-6 bg-radial-[100%_100%_at_50%_100%] from-gradient-start/20 hidden",
        {
          block:
            pathname === "/" ||
            pathname === "/privacy" ||
            pathname === "/terms" ||
            pathname === "/contact",
        }
      )}
    >
      <div className=" max-w-7xl mx-auto py-12 flex items-center max-md:flex-col max-md:items-start max-md:gap-6  justify-between">
        <div>
          <Image
            src="/assets/logo.png"
            alt="1BeatClub"
            width={400}
            height={400}
            className="max-md:w-[300px] max-sm:w-[200px] "
          />
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
          <div className="  max-sm:left-1/2 sm:hidden  w-[180px]">
            <a
              href="https://www.producthunt.com/products/1beatclub?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-1beatclub"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=683983&theme=dark&t=1764508352133"
                alt="1BeatClub - Where&#0032;everyone’s&#0032;vibe&#0032;becomes&#0032;the&#0032;playlist | Product Hunt"
                unoptimized
                width={200}
                height={200}
                className=" max-sm:w-[300px]"
              />
            </a>
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
