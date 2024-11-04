import { Inject, Injectable } from '@nestjs/common';
import { IHotelRepository } from '../domain/repositories/IHotel.repository';

@Injectable()
export class FindHotelByOwnerService {
  /**
   * Constructs a new instance of the FindHotelByOwnerService.
   *
   * @param hotelRepositories The service responsible for interacting with the database.
   */
  constructor(
    @Inject('HOTEL_SERVICE_TOKEN')
    private readonly hotelRepositories: IHotelRepository,
  ) { }

  /**
   * Finds a hotel by its owner.
   *
   * @param ownerId The ID of the owner whose hotel is to be found.
   *
   * @returns The found hotel or null if not found.
   */
  async execute(ownerId: number) {
    const hotel = await this.hotelRepositories.findHotelByOwner(ownerId);
    return hotel;
  }
}
