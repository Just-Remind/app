-- AlterTable
ALTER TABLE "CronJob" ADD COLUMN     "currentCycle" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Highlight" ADD COLUMN     "currentCycle" INTEGER NOT NULL DEFAULT 0;
