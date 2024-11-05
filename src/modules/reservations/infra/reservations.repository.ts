import { Injectable } from "@nestjs/common";
import { IReservationRepositories } from "../domain/repositories/IReservation.repositories";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Reservation, ReservationStatus } from "@prisma/client";

@Injectable()
export class ReservationRepository implements IReservationRepositories {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  createReservation(data: any): Promise<Reservation> {
    return this.prisma.reservation.create({ data })
  }

  findReservationsByUser(id: number): Promise<Reservation[]> {
    return this.prisma.reservation.findMany({ where: { FK_RESERVATION_USER_ID: id } });
  }

  findReservationById(id: number): Promise<Reservation> {
    return this.prisma.reservation.findUnique({ where: { id } });
  }

  findReservations(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  updateStatusReservation(id: number, status: ReservationStatus): Promise<Reservation> {
    return this.prisma.reservation.update({ where: { id }, data: { RESERVATION_STATUS: status } });
  }
}
