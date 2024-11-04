import { Injectable } from '@nestjs/common';

@Injectable()
export class FindHotelsService {
  execute() {
    return `This action returns all hotels`;
  }
}
