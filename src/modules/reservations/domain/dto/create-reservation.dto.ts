import { ReservationStatus } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReservationDto {
  @IsNumber()
  @IsNotEmpty()
  FK_RESERVATION_HOTEL_ID: number;

  @IsString()
  @IsNotEmpty()
  RESERVATION_CHECKIN: string;

  @IsString()
  @IsNotEmpty()
  RESERVATION_CHECKOUT: string;

  @IsEnum(ReservationStatus)
  @IsOptional()
  @Transform(value => value ?? ReservationStatus.PENDING)
  RESERVATION_STATUS: ReservationStatus;
}
