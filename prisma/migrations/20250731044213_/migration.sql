/*
  Warnings:

  - You are about to drop the column `maximumUsers` on the `MusicClub` table. All the data in the column will be lost.
  - Added the required column `maximumMembers` to the `MusicClub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MusicClub" DROP COLUMN "maximumUsers",
ADD COLUMN     "maximumMembers" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."_clubmembers" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_clubmembers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_clubmembers_B_index" ON "public"."_clubmembers"("B");

-- AddForeignKey
ALTER TABLE "public"."_clubmembers" ADD CONSTRAINT "_clubmembers_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."MusicClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_clubmembers" ADD CONSTRAINT "_clubmembers_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
