import { Injectable } from '@nestjs/common';

@Injectable()
export class FindHotelByNameService {
  execute(name: string) {
    return `This action returns a ${name} hotel`;
  }
}
