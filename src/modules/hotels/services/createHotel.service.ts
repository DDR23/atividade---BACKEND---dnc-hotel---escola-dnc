import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/hotelCreate.dto';

@Injectable()
export class CreateHotelService {
  execute(createHotelDto: CreateHotelDto) {
    return 'This action adds a new hotel';
  }
}
