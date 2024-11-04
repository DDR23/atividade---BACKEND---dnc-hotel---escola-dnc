import { Inject, Injectable } from '@nestjs/common';
import { CreateHotelDto } from '../domain/dto/hotelCreate.dto';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class CreateHotelService {
  /**
   * Creates an instance of CreateHotelService.
   * @param hotelRepositories The service responsible for interacting with the database.
   */
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  async execute(createHotelDto: CreateHotelDto) {
  /**
   * Creates a new hotel.
   *
   * @param createHotelDto The information to create a new hotel.
   *
   * @returns The created hotel.
   */
    return await this.hotelRepositories.createHotel(createHotelDto)
  }
}
