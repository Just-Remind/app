-- AlterTable
ALTER TABLE "CronJob" ADD COLUMN     "lastStarterHighlightSent" INTEGER;

-- CreateTable
CREATE TABLE "StarterHighlight" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "StarterHighlight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StarterHighlight_content_key" ON "StarterHighlight"("content");
