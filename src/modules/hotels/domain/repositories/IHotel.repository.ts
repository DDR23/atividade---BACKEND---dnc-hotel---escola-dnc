import { Hotel } from "@prisma/client";
import { CreateHotelDto } from "../dto/hotelCreate.dto";
import { UpdateHotelDto } from "../dto/hotelUpdate.dto";

export interface IHotelRepository {
  createHotel(data: CreateHotelDto): Promise<Hotel>;
  findHotelByName(name: string): Promise<Hotel[] | null>;
  findHotelByOwner(ownerId: number): Promise<Hotel[]>;
  findHotelById(id: number): Promise<Hotel | null>;
  findHotels(): Promise<Hotel[]>;
  updateHotel(id: number, data: UpdateHotelDto): Promise<Hotel>;
  deleteHotel(id: number): Promise<Hotel>;
}
