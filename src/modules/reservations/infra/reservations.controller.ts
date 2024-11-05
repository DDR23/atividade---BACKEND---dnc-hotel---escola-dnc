import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { CreateReservationsService } from '../services/createReservations.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { FindReservationsByUserService } from '../services/findReservationsByUser.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { FindReservationsByIdService } from '../services/findReservationsById.service';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(
    private readonly createReservationsService: CreateReservationsService,
    private readonly findReservationsByUserService: FindReservationsByUserService,
    private readonly findReservationsByIdService: FindReservationsByIdService,
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

  @Get(':id')
  findReservationById(
    @ParamId() id: number,
  ) {
    return this.findReservationsByIdService.execute(id);
  }
}
