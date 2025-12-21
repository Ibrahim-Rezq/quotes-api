/*
  Warnings:

  - You are about to drop the column `content` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the `Reflection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SavedQuote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quoteText` to the `Quote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "Reflection" DROP CONSTRAINT "Reflection_userId_fkey";

-- DropForeignKey
ALTER TABLE "SavedQuote" DROP CONSTRAINT "SavedQuote_originalQuoteId_fkey";

-- DropForeignKey
ALTER TABLE "SavedQuote" DROP CONSTRAINT "SavedQuote_reflectionId_fkey";

-- DropForeignKey
ALTER TABLE "SavedQuote" DROP CONSTRAINT "SavedQuote_userId_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "content",
ADD COLUMN     "quoteText" TEXT NOT NULL,
ADD COLUMN     "reflection" TEXT,
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Reflection";

-- DropTable
DROP TABLE "SavedQuote";

-- CreateIndex
CREATE INDEX "Quote_tags_idx" ON "Quote"("tags");
