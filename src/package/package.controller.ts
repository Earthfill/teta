import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PackageService } from './package.service';

@UseGuards(AuthGuard('jwt'))
@Controller('package')
export class PackageController {
  constructor(private packageService: PackageService) {}

  @Post('count')
  countPackagesCustom(@Body() countDto: object) {
    return this.packageService.countPackagesCustom(countDto);
  }
}
