/*
  Warnings:

  - Added the required column `FK_HOTEL_OWNER_ID` to the `hotels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hotels" ADD COLUMN     "FK_HOTEL_OWNER_ID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "hotels" ADD CONSTRAINT "hotels_FK_HOTEL_OWNER_ID_fkey" FOREIGN KEY ("FK_HOTEL_OWNER_ID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
