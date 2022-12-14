-- CreateTable
CREATE TABLE "CronJob" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobId" INTEGER NOT NULL,
    "cronExpression" TEXT NOT NULL DEFAULT E'0 8 * * * *',
    "timezone" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "user" TEXT NOT NULL,
    "uniqueBooksOnly" BOOLEAN NOT NULL DEFAULT false,
    "highlightsPerEmail" INTEGER NOT NULL DEFAULT 5,
    "highlightsQualityFilter" BOOLEAN NOT NULL DEFAULT true,
    "currentCycle" INTEGER NOT NULL DEFAULT 1,
    "cycleMode" BOOLEAN NOT NULL DEFAULT true,
    "cycleStartDate" TIMESTAMP(3),
    "bonusHighlightEnabled" BOOLEAN NOT NULL DEFAULT true,
    "bonusHighlightsPerEmail" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "CronJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "user" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "isbn" TEXT,
    "asin" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "currentCycle" INTEGER NOT NULL DEFAULT 0,
    "lastSentOn" TIMESTAMP(3),
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CronJob_user_key" ON "CronJob"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Book_user_title_key" ON "Book"("user", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Highlight_bookId_content_key" ON "Highlight"("bookId", "content");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToTag_AB_unique" ON "_BookToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToTag_B_index" ON "_BookToTag"("B");

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToTag" ADD FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

