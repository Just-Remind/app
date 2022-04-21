-- AlterTable
ALTER TABLE "CronJob" ALTER COLUMN "cronExpression" SET DEFAULT E'0 6 * * * *',
ALTER COLUMN "enabled" SET DEFAULT true;
