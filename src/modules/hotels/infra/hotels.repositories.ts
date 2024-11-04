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
   * Finds a hotel by its ID.
   *
   * @param id The ID of the hotel to be found
   *
   * @returns The found hotel or null if not found
   */
  findHotelById(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({ where: { id } });
  }

  // findHotelByName(name: string): Promise<Hotel | null> {
  //   throw new Error("Method not implemented.");
  // }

  // findHotels(): Promise<Hotel[]> {
  //   throw new Error("Method not implemented.");
  // }

  // updateHotel(id: number, data: CreateHotelDto): Promise<Hotel> {
  //   throw new Error("Method not implemented.");
  // }

  // deleteHotel(id: number): Promise<Hotel> {
  //   throw new Error("Method not implemented.");
  // }
}
