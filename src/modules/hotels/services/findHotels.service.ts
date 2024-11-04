import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class FindHotelsService {
  /**
   * Constructs a new instance of the FindHotelsService.
   *
   * @param hotelRepositories The service responsible for interacting with the database.
   */
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  /**
   * Finds all hotels in the database.
   *
   * @returns An array of hotels from the database.
   */
  async execute() {
    return await this.hotelRepositories.findHotels();
  }
}
