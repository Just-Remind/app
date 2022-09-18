/*
  Warnings:

  - You are about to drop the column `currentCycle` on the `CronJob` table. All the data in the column will be lost.
  - You are about to drop the column `currentCycle` on the `Highlight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CronJob" DROP COLUMN "currentCycle",
ADD COLUMN     "cycleStartDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Highlight" DROP COLUMN "currentCycle",
ADD COLUMN     "lastSentOn" TIMESTAMP(3);
