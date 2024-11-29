/*
  Warnings:

  - The primary key for the `clubs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `email` on table `clubs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `clubs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "financial_transactions" DROP CONSTRAINT "financial_transactions_clubId_fkey";

-- AlterTable
ALTER TABLE "clubs" DROP CONSTRAINT "clubs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ADD CONSTRAINT "clubs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "clubs_id_seq";

-- AlterTable
ALTER TABLE "financial_transactions" ALTER COLUMN "clubId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "recurrences" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "source_categories" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "source_destinations" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "transaction_categories" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "financial_transactions" ADD CONSTRAINT "financial_transactions_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "clubs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
