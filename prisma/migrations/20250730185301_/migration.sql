-- CreateTable
CREATE TABLE "public"."MusicClub" (
    "id" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,
    "description" TEXT,
    "clubOwnerId" TEXT NOT NULL,
    "maximumUsers" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MusicClub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."MusicClub" ADD CONSTRAINT "MusicClub_clubOwnerId_fkey" FOREIGN KEY ("clubOwnerId") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
