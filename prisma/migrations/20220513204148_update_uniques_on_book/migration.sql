/*
  Warnings:

  - A unique constraint covering the columns `[userId,title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Book_title_key";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Book_userId_title_key" ON "Book"("userId", "title");
