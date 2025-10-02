-- CreateTable
CREATE TABLE "public"."ListedSongs" (
    "id" SERIAL NOT NULL,
    "songTitle" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "highResThumbnail" TEXT,
    "link" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,

    CONSTRAINT "ListedSongs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Votes" (
    "songId" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("songId","user_id")
);

-- AddForeignKey
ALTER TABLE "public"."ListedSongs" ADD CONSTRAINT "ListedSongs_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."MusicClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ListedSongs" ADD CONSTRAINT "ListedSongs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Votes" ADD CONSTRAINT "Votes_songId_fkey" FOREIGN KEY ("songId") REFERENCES "public"."ListedSongs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Votes" ADD CONSTRAINT "Votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
