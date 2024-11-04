import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../domain/dto/hotelCreate.dto";
import { IHotelRepository } from "../domain/repositories/IHotel.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HotelsRepositories implements IHotelRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  /**
   * Creates a new hotel.
   *
   * @param data The data of the hotel to be created
   *
   * @returns The created hotel
   */
  createHotel(data: CreateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.create({ data });
  }

  /**
   * Finds a hotel by its name.
   *
   * The search is case-insensitive and will search for the given name
   * anywhere in the hotel's name. If the hotel is not found, null is returned.
   *
   * @param name The name of the hotel to be found
   *
   * @returns The found hotel or null if not found
   */
  findHotelByName(name: string): Promise<Hotel[] | null> {
    return this.prisma.hotel.findMany({
      where: { HOTEL_NAME: { contains: name, mode: 'insensitive' } }
    });
  }

  /**
   * Finds all hotels owned by the given user.
   *
   * @param ownerId The ID of the user who owns the hotels
   *
   * @returns An array of hotels owned by the given user
   */
  findHotelByOwner(ownerId: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({ where: { FK_HOTEL_OWNER_ID: ownerId } });
  }

  /**
   * Finds a hotel by its ID.
   *
   * @param id The ID of the hotel to be found
   *
   * @returns The found hotel or null if not found
   */
  findHotelById(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({ where: { id } });
  }

  /**
   * Retrieves a list of all hotels.
   *
   * @returns A promise that resolves to an array of hotels.
   */
  findHotels(): Promise<Hotel[]> {
    return this.prisma.hotel.findMany()
  }

  // updateHotel(id: number, data: CreateHotelDto): Promise<Hotel> {
  //   throw new Error("Method not implemented.");
  // }

  // deleteHotel(id: number): Promise<Hotel> {
  //   throw new Error("Method not implemented.");
  // }
}
