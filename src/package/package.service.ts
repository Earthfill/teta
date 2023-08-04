import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package, PackageDocument } from './schemas';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package.name)
    private packageModel: Model<PackageDocument>,
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

  async getPackagesCustom(customDto: object) {
    try {
      const packages = await this.packageModel.find(customDto).exec();
      return packages;
    } catch (error) {
      throw new HttpException(
        'Cannot obtain packages, try again later',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  async getAllPackages(): Promise<Package[]> {
    try {
      const allPackages = await this.packageModel.find().exec();
      return allPackages;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all packages. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPackageById(packageId: string): Promise<Package> {
    try {
      const _package = await this.packageModel.findById(packageId).exec();
      if (!_package) {
        throw new HttpException('Package not found', HttpStatus.NOT_FOUND);
      }
      return _package;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch package. Please try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
