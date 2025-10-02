/*
  Warnings:

  - Added the required column `to_username` to the `Invitations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Invitations" ADD COLUMN     "to_username" TEXT NOT NULL;
