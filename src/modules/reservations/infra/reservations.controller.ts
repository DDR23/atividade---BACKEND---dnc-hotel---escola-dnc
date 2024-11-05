import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { CreateReservationsService } from '../services/createReservations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
  ) { }

  @Post('create')
  create(
    @User('id') id: number,
    @Body() data: CreateReservationDto
  ) {
    return this.createReservationsService.create(id, data);
  }
}
