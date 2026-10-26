-- CreateTable
CREATE TABLE "LetterUnlockAttempt" (
    "id" TEXT NOT NULL,
    "letterId" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "windowStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LetterUnlockAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LetterUnlockAttempt_letterId_ip_key" ON "LetterUnlockAttempt"("letterId", "ip");

-- AddForeignKey
ALTER TABLE "LetterUnlockAttempt" ADD CONSTRAINT "LetterUnlockAttempt_letterId_fkey" FOREIGN KEY ("letterId") REFERENCES "Letter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
