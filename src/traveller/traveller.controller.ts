import { Body, Controller, Post , UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TravellerService } from './traveller.service';

@UseGuards(AuthGuard('jwt'))
@Controller('traveller')
export class TravellerController {
    constructor(private travellerService: TravellerService){}

    @Post('count')
    countTravellerCustom(@Body() countDto: object){
        return this.travellerService.countTravellerCustom(countDto)
    }
    @Post('custom')
    getTravellerCustom(@Body() customDto:object){
        return this.travellerService.getTravellerCustom(customDto)
    }
}
