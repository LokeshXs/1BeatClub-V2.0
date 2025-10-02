import { Skeleton } from "../ui/skeleton";

export default function SongCardSkeleton() {
  return (
    <div className=" flex gap-6 justify-between py-4 px-4  ">
      <div className=" flex   gap-6">
        <Skeleton className="h-12 w-24 bg-neutral-700" />

        <div className=" space-y-2">
          <Skeleton className=" h-4 w-[440px] bg-neutral-700" />
          <Skeleton className=" h-8 w-20 bg-neutral-700" />
        </div>
      </div>
      <Skeleton className=" w-24 h-12 bg-neutral-700" />
    </div>
  );
}
