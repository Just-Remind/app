-- AlterTable
ALTER TABLE "CronJob" ADD COLUMN     "bonusHighlightEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "bonusHighlightsPerEmail" INTEGER NOT NULL DEFAULT 3;
