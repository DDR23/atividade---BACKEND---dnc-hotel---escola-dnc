import { Reservation, ReservationStatus } from "@prisma/client";
import { CreateReservationDto } from "../dto/create-reservation.dto";

export interface IReservationRepositories {
  createReservation(data: CreateReservationDto): Promise<Reservation>;
  findReservationsByUser(id: number): Promise<Reservation[]>;
  findReservationById(id: number): Promise<Reservation>;
  findReservations(): Promise<Reservation[]>;
  updateStatusReservation(id: number, status: ReservationStatus): Promise<Reservation>;
}
