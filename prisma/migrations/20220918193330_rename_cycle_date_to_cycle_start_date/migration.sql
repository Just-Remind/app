-- -- -- AlterTable
-- ALTER TABLE "CronJob" ADD COLUMN     "cycleDate" TIMESTAMP(3);

-- -- -- AlterTable
-- ALTER TABLE "Highlight" ADD COLUMN     "lastSentOn" TIMESTAMP(3);

ALTER TABLE "CronJob" RENAME COLUMN "cycleDate" TO "cycleStartDate"