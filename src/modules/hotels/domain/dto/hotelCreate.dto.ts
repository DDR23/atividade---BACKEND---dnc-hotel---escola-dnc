import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

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
  @IsNotEmpty()
  @MaxLength(255)
  HOTEL_ADDRESS: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  HOTEL_IMAGE?: string;

  @IsNumber()
  @IsNotEmpty()
  HOTEL_PRICE: number;

  @IsNumber()
  FK_HOTEL_OWNER_ID: number;
}
