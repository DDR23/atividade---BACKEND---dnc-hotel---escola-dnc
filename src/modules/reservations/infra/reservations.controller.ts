import { Controller, Post, Body, UseGuards, Get, Patch } from '@nestjs/common';
import { CreateReservationDto } from '../domain/dto/create-reservation.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { FindReservationsByUserService } from '../services/findReservationsByUser.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { CreateReservationService } from '../services/createReservation.service';
import { FindReservationByIdService } from '../services/findReservationById.service';
import { FindReservationsService } from '../services/findReservations.service';
import { UpdateReservationService } from '../services/updateReservation.service';
import { ReservationStatus } from '@prisma/client';

@Controller('reservations')
@UseGuards(AuthGuard)
export class ReservationsController {
  constructor(
    private readonly createReservationService: CreateReservationService,
    private readonly findReservationsByUserService: FindReservationsByUserService,
    private readonly findReservationByIdService: FindReservationByIdService,
    private readonly findReservationsService: FindReservationsService,
    private readonly updateReservationService: UpdateReservationService,
  ) { }

  @Post('create')
  createReservation(
    @User('id') id: number,
    @Body() data: CreateReservationDto,
  ) {
    return this.createReservationService.execute(id, data);
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
    return this.findReservationByIdService.execute(id);
  }

  @Get()
  findReservations() {
    return this.findReservationsService.execute();
  }

  @Patch('update/:id')
  updateStatusReservation(
    @ParamId() id: number,
    @Body('RESERVATION_STATUS') status: ReservationStatus,
  ) {
    return this.updateReservationService.execute(id, status);
  }
}
