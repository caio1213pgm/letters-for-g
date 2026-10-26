/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Letter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Letter_slug_key" ON "Letter"("slug");
