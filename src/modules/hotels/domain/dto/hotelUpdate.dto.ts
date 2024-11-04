import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelDto } from './hotelCreate.dto';

export class UpdateHotelDto extends PartialType(CreateHotelDto) { }
