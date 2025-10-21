import { MAIL } from "@/lib/data";
import { IconMailFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto pt-40 max-sm:pt-24 px-6 min-h-screen  ">
      <div className=" px-6 py-14 max-sm:py-8 border border-muted-foreground rounded-xl inset-shadow-custom flex flex-col gap-6 bg-gradient-to-br from-gradient-start/10 via-gradient-via/10 to-gradient-end/10">
        <h1 className=" text-4xl max-sm:text-2xl font-semibold">
          Contact Us
        </h1>
        <p className="max-sm:text-sm">
         Have questions? We&apos;d love to hear from you.
        </p>
      </div>
      <div className=" mt-12 max-sm:mt-8 space-y-4 max-sm:text-sm">
        <div className=" flex items-center gap-2">
            <IconMailFilled/> <Link href={`mailto:${MAIL}`} className=" font-semibold underline">{MAIL}</Link>
        </div>
        <p>
            We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please include &quot;Urgent&quot; in your email subject line.
        </p>
      </div>
    </div>
  );
}
