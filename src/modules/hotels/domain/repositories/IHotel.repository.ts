import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../dto/hotelCreate.dto";
import { UpdateHotelDto } from "../dto/hotelUpdate.dto";

export interface IHotelRepository {
  createHotel(id: number, data: CreateHotelDto): Promise<Hotel>;
  findHotelByName(name: string): Promise<Hotel[] | null>;
  findHotelByOwner(ownerId: number): Promise<Hotel[]>;
  findHotelById(id: number): Promise<Hotel | null>;
  findHotels(offSet: number, limit: number): Promise<Hotel[]>;
  countHotels(): Promise<number>;
  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel>;
  uploadImageHotel(id: number, data: UpdateHotelDto): Promise<Hotel>;
  deleteHotel(id: number): Promise<Hotel>;
}
