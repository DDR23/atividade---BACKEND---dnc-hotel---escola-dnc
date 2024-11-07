import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../dto/create-hotel.dto";
import { UpdateHotelDto } from "../dto/update-hotel.dto";

export interface IHotelRepositories {
  createHotel(id: number, data: CreateHotelDto): Promise<Hotel>;
  findHotelByName(name: string): Promise<Hotel[] | null>;
  findHotelByOwner(ownerId: number): Promise<Hotel[]>;
  findHotelById(id: number): Promise<Hotel | null>;
  findHotels(offSet: number, limit: number): Promise<Hotel[]>;
  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel>;
  uploadImageHotel(id: number, data: UpdateHotelDto): Promise<Hotel>;
  deleteHotel(id: number): Promise<Hotel>;
  countHotels(): Promise<number>;
}
