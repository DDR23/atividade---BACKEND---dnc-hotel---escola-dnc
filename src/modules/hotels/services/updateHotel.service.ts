import { Inject, Injectable } from '@nestjs/common';
import { UpdateHotelDto } from '../domain/dto/hotelUpdate.dto';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class UpdateHotelService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  async execute(id: number, updateHotelDto: UpdateHotelDto) {
    return await this.hotelRepositories.updateHotel(id, updateHotelDto);
  }
}
