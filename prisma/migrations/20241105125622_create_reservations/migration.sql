-- CreateTable
CREATE TABLE "reservations" (
    "id" SERIAL NOT NULL,
    "RESERVATION_CHECKIN" TIMESTAMP(3) NOT NULL,
    "RESERVATION_CHECKOUT" TIMESTAMP(3) NOT NULL,
    "RESERVATION_TOTAL" DOUBLE PRECISION NOT NULL,
    "RESERVATION_APPROVED" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);
