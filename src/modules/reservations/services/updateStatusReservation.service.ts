import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IReservationRepositories } from '../domain/repositories/IReservation.repositories';
import { ReservationStatus } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { updateUserEmail } from '../utils/templateHTML';
import { FindUserByIdService } from 'src/modules/users/services/findUserById.service';

@Injectable()
export class UpdateStatusReservationService {
  constructor(
    @Inject('RESERVATION_SERVICE_TOKEN')
    private readonly reservationRepositories: IReservationRepositories,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly mailerService: MailerService,
  ) { }

  async execute(id: number, status: ReservationStatus) {
    if (!(status in ReservationStatus)) throw new BadRequestException('Invalid reservations status');
    const newReservation = await this.reservationRepositories.updateStatusReservation(id, status);
    const user = await this.findUserByIdService.execute(newReservation.FK_RESERVATION_USER_ID);
    await this.mailerService.sendMail({
      to: user.USER_EMAIL,
      subject: 'Reservation status update',
      html: updateUserEmail(user.USER_NAME, newReservation.RESERVATION_STATUS),
    })
    return newReservation;
  }
}
