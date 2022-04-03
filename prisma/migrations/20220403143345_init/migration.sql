/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Book_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");
