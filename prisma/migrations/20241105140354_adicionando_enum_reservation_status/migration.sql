/*
  Warnings:

  - You are about to drop the column `RESERVATION_APPROVED` on the `reservations` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED');

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "RESERVATION_APPROVED",
ADD COLUMN     "RESERVATION_STATUS" "ReservationStatus" NOT NULL DEFAULT 'PENDING';
