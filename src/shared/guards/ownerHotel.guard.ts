import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { FindHotelByIdService } from "src/modules/hotels/services/findHotelById.service";

@Injectable()
export class OwnerHotelGuard implements CanActivate {
  constructor(
    private readonly findHotelByIdService: FindHotelByIdService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const hotelId = request.params.id;
    const user = request.user;
    if (!user) return false;
    const hotel = await this.findHotelByIdService.execute(hotelId);
    if (!hotel) return false;
    return hotel.FK_HOTEL_OWNER_ID === user.id;
  }
}
