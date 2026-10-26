/*
  Warnings:

  - You are about to drop the column `textLetter` on the `Letter` table. All the data in the column will be lost.
  - Added the required column `text` to the `Letter` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LetterStatus" AS ENUM ('SKETCH', 'SEND', 'READ');

-- AlterTable
ALTER TABLE "Letter" DROP COLUMN "textLetter",
ADD COLUMN     "status" "LetterStatus" NOT NULL DEFAULT 'SKETCH',
ADD COLUMN     "text" TEXT NOT NULL;
