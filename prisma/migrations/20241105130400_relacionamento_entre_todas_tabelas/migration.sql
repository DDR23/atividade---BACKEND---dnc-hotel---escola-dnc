/*
  Warnings:

  - Added the required column `FK_RESERVATION_HOTEL_ID` to the `reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FK_RESERVATION_USER_ID` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "FK_RESERVATION_HOTEL_ID" INTEGER NOT NULL,
ADD COLUMN     "FK_RESERVATION_USER_ID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_FK_RESERVATION_USER_ID_fkey" FOREIGN KEY ("FK_RESERVATION_USER_ID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_FK_RESERVATION_HOTEL_ID_fkey" FOREIGN KEY ("FK_RESERVATION_HOTEL_ID") REFERENCES "hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
