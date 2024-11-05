import { Injectable } from "@nestjs/common";
import { IReservationRepositories } from "../domain/repositories/IReservation.repositories";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { Reservation } from "@prisma/client";

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

  findReservationsById(id: number): Promise<Reservation> {
    return this.prisma.reservation.findUnique({ where: { id } });
  }
}
