/*
  Warnings:

  - You are about to drop the column `cronJonId` on the `User` table. All the data in the column will be lost.
  - Added the required column `cronJobId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cronJonId",
ADD COLUMN     "cronJobId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CronJob" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobId" INTEGER NOT NULL,
    "cronExpression" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL,

    CONSTRAINT "CronJob_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cronJobId_fkey" FOREIGN KEY ("cronJobId") REFERENCES "CronJob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
