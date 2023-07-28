import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package } from './schemas/package.schema';
import { Model } from 'mongoose';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<Package>,
  ) {}

  async countPackagesCustom(countDto: object) {
    try {
      const count = await this.packageModel.count(countDto).exec();
      return { count };
    } catch (error) {
      throw new HttpException(
        'Cannot obtain count for packages, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }
}
