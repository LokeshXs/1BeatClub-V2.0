import { Skeleton } from "@/components/ui/skeleton";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
export default function SignUpPage() {
  return (
    <section className=" flex flex-col items-center gap-8">
      <div className=" flex flex-col items-center gap-2">
        <h1 className=" text-2xl max-sm:text-xl font-bold ">Join the Party!</h1>
        <p className=" text-muted max-sm:text-sm text-center">
          Create your club, share your favorite songs, and vibe together.
        </p>
      </div>
      <SignUp
        fallback={
          <div>
            <Skeleton className=" w-[400px] h-[600px] bg-[#212126]" />
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
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="  font-semibold underline text-gradient-start text-shadow-md"
        >
          Sign in
        </Link>
      </p>
    </section>
  );
}
