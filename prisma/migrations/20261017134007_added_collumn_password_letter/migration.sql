/*
  Warnings:

  - A unique constraint covering the columns `[authorId,slug]` on the table `Letter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Letter" ADD COLUMN     "passwordLetter" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Letter_authorId_slug_key" ON "Letter"("authorId", "slug");
