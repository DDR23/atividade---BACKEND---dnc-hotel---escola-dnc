import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { CreateReservationsService } from '../services/createReservations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { FindReservationsByUserService } from '../services/findReservationsByUser.service';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly findReservationsByUserService: FindReservationsByUserService,
  ) { }

  @Post('create')
  createReservation(
    @User('id') id: number,
    @Body() data: CreateReservationDto,
  ) {
    return this.createReservationsService.execute(id, data);
  }

  @Get('user')
  findReservationByUser(
    @User('id') id: number,
  ) {
    return this.findReservationsByUserService.execute(id);
  }
}
