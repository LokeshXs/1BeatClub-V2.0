/*
  Warnings:

  - Added the required column `clubName` to the `Invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clubOwnerUserName` to the `Invitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Invitations" ADD COLUMN     "clubName" TEXT NOT NULL,
ADD COLUMN     "clubOwnerUserName" TEXT NOT NULL;
