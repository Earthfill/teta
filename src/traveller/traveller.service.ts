import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Traveller } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class TravellerService {
  constructor(
    @InjectModel(Traveller.name) private travellerModel: Model<Traveller>,
  ) {}

  async countTravellerCustom(customDto: object) {
    try {
      const count = await this.travellerModel.count(customDto).exec();
      return { count };
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count. Please try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
  async getTravellerCustom(customDto: object) {
    try {
      const travellers = await this.travellerModel.find(customDto).exec();
      return travellers;
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count for travellers, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
