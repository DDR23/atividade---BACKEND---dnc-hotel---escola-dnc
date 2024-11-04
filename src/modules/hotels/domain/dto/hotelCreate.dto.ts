import { IsDecimal, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateHotelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  HOTEL_NAME: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  HOTEL_DESCRIPTION: string;

  @IsString()
  @MaxLength(255)
  HOTEL_IMAGE: string;

  @IsDecimal()
  @IsNotEmpty()
  HOTEL_PRICE: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  HOTEL_ADDRESS: string;

  @IsNumber()
  @IsNotEmpty()
  FK_HOTEL_OWNER_ID: string;
}
