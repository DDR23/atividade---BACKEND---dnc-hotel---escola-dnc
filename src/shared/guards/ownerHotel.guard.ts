import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { FindHotelByIdService } from "src/modules/hotels/services/findHotelById.service";

@Injectable()
export class OwnerHotelGuard implements CanActivate {
  /**
   * Constructs a new instance of the OwnerHotelGuard.
   *
   * @param findHotelByIdService The service responsible for finding a hotel by its ID.
   */
  constructor(
    private readonly findHotelByIdService: FindHotelByIdService,
  ) { }


  /**
   * Determines if the current user is allowed to activate the route.
   * 
   * @param context - The execution context containing request details.
   * @returns A promise that resolves to a boolean indicating if the user
   *          is the owner of the hotel specified in the request parameters.
   *          Returns false if the user is not authenticated or the hotel
   *          does not exist.
   */
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
