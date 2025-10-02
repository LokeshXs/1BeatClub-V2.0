-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED');

-- CreateTable
CREATE TABLE "public"."Invitations" (
    "id" SERIAL NOT NULL,
    "to_userId" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,
    "clubOwnerId" TEXT NOT NULL,
    "status" "public"."status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitations_to_userId_clubId_key" ON "public"."Invitations"("to_userId", "clubId");

-- AddForeignKey
ALTER TABLE "public"."Invitations" ADD CONSTRAINT "Invitations_to_userId_fkey" FOREIGN KEY ("to_userId") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invitations" ADD CONSTRAINT "Invitations_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "public"."MusicClub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invitations" ADD CONSTRAINT "Invitations_clubOwnerId_fkey" FOREIGN KEY ("clubOwnerId") REFERENCES "public"."User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
