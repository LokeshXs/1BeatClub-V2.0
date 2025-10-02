import { Skeleton } from "@/components/ui/skeleton";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
export default function SignInPage() {
  return (
    <section className=" flex flex-col gap-8">
      <div className=" flex flex-col items-center gap-2 ">
        <h1 className=" text-2xl max-sm:text-xl font-bold ">
          Welcome Back to the Party!
        </h1>
        <p className=" text-muted max-sm:text-sm text-center">
          Sign in to join your music crew and keep the vibe alive.
        </p>
      </div>
      <SignIn
        oauthFlow="redirect"
        fallback={
          <div>
            <Skeleton className=" w-[400px] h-[500px] bg-[#212126]" />
          </div>
        }
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-gradient-to-r from-gradient-start via-gradient-via to-gradient-end  ",
          },
        }}
      />

      <p className=" text-center text-muted max-sm:text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="  font-semibold underline text-gradient-start text-shadow-md"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
}
