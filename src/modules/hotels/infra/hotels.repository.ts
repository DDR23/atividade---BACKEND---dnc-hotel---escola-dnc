import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../domain/dto/create-hotel.dto";
import { IHotelRepositories } from "../domain/repositories/IHotel.repositories";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateHotelDto } from "../domain/dto/update-hotel.dto";

@Injectable()
export class HotelsRepository implements IHotelRepositories {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  createHotel(id: number, data: CreateHotelDto): Promise<Hotel> {
    data.FK_HOTEL_OWNER_ID = id;
    return this.prisma.hotel.create({ data });
  }

  findHotelByName(name: string): Promise<Hotel[] | null> {
    return this.prisma.hotel.findMany({ where: { HOTEL_NAME: { contains: name, mode: 'insensitive' } } });
  }

  findHotelByOwner(ownerId: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({ where: { FK_HOTEL_OWNER_ID: ownerId } });
  }

  findHotelById(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({ where: { id: Number(id) } });
  }

  findHotels(offSet: number, limit: number): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({
      take: limit,
      skip: offSet,
      include: { HOTEL_OWNER: true },
    });
  }
  
  countHotels(): Promise<number> {
    return this.prisma.hotel.count();
  }

  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.update({ where: { id }, data });
  }

  uploadImageHotel(id: number, data: UpdateHotelDto): Promise<Hotel> {
    return this.prisma.hotel.update({ where: { id }, data });
  }

  deleteHotel(id: number): Promise<Hotel> {
    return this.prisma.hotel.delete({ where: { id } })
  }
}
