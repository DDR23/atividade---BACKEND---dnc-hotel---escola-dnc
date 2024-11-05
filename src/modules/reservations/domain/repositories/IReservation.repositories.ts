import { Reservation } from "@prisma/client";
import { CreateReservationDto } from "../dto/create-reservation.dto";

export interface IReservationRepositories {
  createReservation(data: CreateReservationDto): Promise<Reservation>;
  findReservationsByUser(id: number): Promise<Reservation[]>;
}
