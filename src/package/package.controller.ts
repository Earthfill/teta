import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PackageService } from './package.service';
import { Package } from './schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Post('count')
  countPackagesCustom(@Body() countDto: object) {
    return this.packageService.countPackagesCustom(countDto);
  }

  @Get()
  getAllPackages(): Promise<Package[]> {
    return this.packageService.getAllPackages();
  }

  @Get(':id')
  getPackageById(@Param('id') packageId: string): Promise<Package> {
    return this.packageService.getPackageById(packageId);
  }
}
