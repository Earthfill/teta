import { Controller, Post, Body } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Post('count')
  async countPackagesCustom(@Body() countDto: object) {
    return this.packageService.countPackagesCustom(countDto);
  }
}
