import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordDto, LoginDto, RegisterStaffDto } from './dto';
import { GetStaff } from './decorators/getstaff.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('registration')
  registration(@Body() registerStaffDto: RegisterStaffDto) {
    return this.authService.registration(registerStaffDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('home')
  home() {
    return 'home';
  }

  @Post('changePassword')
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetStaff('_id') staffId: string,
  ) {
    return this.authService.changePassword(changePasswordDto, staffId);
  }
}
