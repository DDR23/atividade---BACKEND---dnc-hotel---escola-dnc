import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/hotelCreate.dto';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class CreateHotelService {
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  async execute(id: number, createHotelDto: CreateHotelDto) {
    return await this.hotelRepositories.createHotel(id, createHotelDto);
  }
}
