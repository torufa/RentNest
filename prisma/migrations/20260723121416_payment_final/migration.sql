/*
  Warnings:

  - You are about to drop the column `rentalId` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rentalRequestId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rentalRequestId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'MOBILE_BANKING', 'BANK_TRANSFER');

-- AlterEnum
ALTER TYPE "RentalRequestsStatus" ADD VALUE 'PAID';

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rentalId_fkey";

-- DropIndex
DROP INDEX "payments_rentalId_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "rentalId",
ADD COLUMN     "method" "PaymentMethod" NOT NULL DEFAULT 'CARD',
ADD COLUMN     "rentalRequestId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_rentalRequestId_key" ON "payments"("rentalRequestId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalRequestId_fkey" FOREIGN KEY ("rentalRequestId") REFERENCES "rentalRequests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
