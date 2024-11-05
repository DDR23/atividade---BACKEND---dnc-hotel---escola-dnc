import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../domain/dto/hotelCreate.dto";
import { IHotelRepository } from "../domain/repositories/IHotel.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateHotelDto } from "../domain/dto/hotelUpdate.dto";

@Injectable()
export class HotelsRepositories implements IHotelRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  createHotel(data: CreateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.create({ data });
  }

  findHotelByName(name: string): Promise<Hotel[] | null> {
    return this.prisma.hotel.findMany({ where: { HOTEL_NAME: { contains: name, mode: 'insensitive' } } });
  }

  findHotelByOwner(ownerId: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({ where: { FK_HOTEL_OWNER_ID: ownerId } });
  }

  findHotelById(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({ where: { id } });
  }

  findHotels(): Promise<Hotel[]> {
    return this.prisma.hotel.findMany();
  }

  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.update({ where: { id }, data });
  }

  deleteHotel(id: number): Promise<Hotel> {
    return this.prisma.hotel.delete({ where: { id } })
  }
}
