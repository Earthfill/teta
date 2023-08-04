import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TravellerService } from './traveller.service';
import { AddTravellerDto } from './dto';
import { Traveller } from './interfaces';

@UseGuards(AuthGuard('jwt'))
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

  @Post()
  addTraveller(@Body() addTravellerDto: AddTravellerDto): Promise<Traveller> {
    return this.travellerService.addTraveller(addTravellerDto);
  }

  @Delete(':id')
  deleteTraveller(@Param('id') travellerId: string): Promise<Traveller> {
    return this.travellerService.deleteTravellerById(travellerId);
  }

  @Get()
  getAllTravellers(): Promise<Traveller[]> {
    return this.travellerService.getAllTravellers();
  }

  @Get(':id')
  getTravellerById(@Param('id') travellerId: string): Promise<Traveller> {
    return this.travellerService.getTravellerById(travellerId);
  }
}
