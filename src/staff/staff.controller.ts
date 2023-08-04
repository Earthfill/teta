import { Controller, Get, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { GetStaff } from 'src/auth/decorators/getstaff.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Staff } from 'src/auth/schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Get()
  getStaffs() {
    return this.staffService.getStaffs();
  }

  @Get('loggedIn')
  getloggedInStaff(@GetStaff() staffObj: Staff) {
    return this.staffService.getloggedInStaff(staffObj);
  }
}
