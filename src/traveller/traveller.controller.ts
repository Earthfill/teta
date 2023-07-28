import { Body, Controller, Post } from '@nestjs/common';
import { TravellerService } from './traveller.service';

@Controller('traveller')
export class TravellerController {
  constructor(private travellerService: TravellerService) {}

  @Post('count')
  countTravellerCustom(@Body() countDto: object) {
    return this.travellerService.countTravellerCustom(countDto);
  }
  @Post('custom')
  getTravellerCustom(@Body() customDto: object) {
    return this.travellerService.getTravellerCustom(customDto);
  }
}
