-- AlterTable
ALTER TABLE "CronJob" ADD COLUMN     "uniqueBooksOnly" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "cronExpression" SET DEFAULT E'0 8 * * * *';
