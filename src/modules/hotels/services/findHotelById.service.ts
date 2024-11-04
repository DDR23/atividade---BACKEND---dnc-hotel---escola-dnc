import { Injectable } from '@nestjs/common';

@Injectable()
export class FindHotelByIdService {
  execute(id: number) {
    return `This action returns a #${id} hotel`;
  }
}
