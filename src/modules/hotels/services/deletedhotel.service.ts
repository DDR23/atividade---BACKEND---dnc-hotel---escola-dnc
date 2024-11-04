import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteHotelService {
  execute(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
