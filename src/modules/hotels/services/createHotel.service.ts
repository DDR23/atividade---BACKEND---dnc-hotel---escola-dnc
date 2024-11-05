import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/create-hotel.dto';
import { IHotelRepositories } from '../domain/repositories/IHotel.repositories';

@Injectable()
export class CreateHotelService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepositories,
  ) { }

  async execute(id: number, createHotelDto: CreateHotelDto) {
    return await this.hotelRepositories.createHotel(id, createHotelDto);
  }
}
