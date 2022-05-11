/*
  Warnings:

  - A unique constraint covering the columns `[bookId,content]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_bookId_content_key" ON "Note"("bookId", "content");
