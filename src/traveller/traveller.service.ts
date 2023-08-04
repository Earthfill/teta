import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddTravellerDto } from './dto';
import { Traveller, TravellerDocument } from './schemas';

@Injectable()
export class TravellerService {
  constructor(
    @InjectModel(Traveller.name)
    private travellerModel: Model<TravellerDocument>,
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

  async addTraveller(addTravellerDto: AddTravellerDto) {
    try {
      const newTraveller = await this.travellerModel.create(addTravellerDto);
      return newTraveller;
    } catch (error) {
      throw new HttpException(
        'Failed to create traveller. Please try again later',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteTravellerById(travellerId: string) {
    try {
      const deletedTraveller = await this.travellerModel
        .findByIdAndRemove(travellerId)
        .exec();
      return deletedTraveller;
    } catch (error) {
      throw new HttpException(
        'Failed to delete traveller. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllTravellers(): Promise<Traveller[]> {
    try {
      const allTravellers = await this.travellerModel.find().exec();
      return allTravellers;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all travellers. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTravellerById(travellerId: string): Promise<Traveller> {
    try {
      const traveller = await this.travellerModel.findById(travellerId).exec();
      if (!traveller) {
        throw new HttpException('Traveller not found', HttpStatus.NOT_FOUND);
      }
      return traveller;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch traveller. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
