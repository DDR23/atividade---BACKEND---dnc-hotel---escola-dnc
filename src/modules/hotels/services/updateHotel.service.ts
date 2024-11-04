import { Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/hotelUpdate.dto';

@Injectable()
export class UpdateHotelService {
  execute(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }
}
