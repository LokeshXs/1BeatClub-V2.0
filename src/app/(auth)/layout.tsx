import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="p-12 max-sm:p-6 flex flex-col items-center justify-center gap-6  min-h-screen  bg-background  bg-radial-[at_50%_0%]  from-gradient-start/40 to-background   ">
      <Link href="/">
        <Image
          src="/assets/logo.png"
          alt="1BeatClub Logo"
          width={150}
          height={150}
        />
      </Link>
      <div className="  w-full flex justify-center items-center container mx-auto">
        {children}
      </div>
    </main>
  );
}
