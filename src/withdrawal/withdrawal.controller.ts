import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WithdrawalService } from './withdrawal.service';
import { ModifyWithdrawalDto } from './dto';
import { Withdrawal } from './schemas';

@UseGuards(AuthGuard('jwt'))
@Controller('withdrawal')
export class WithdrawalController {
  constructor(private withdrawalService: WithdrawalService) {}

  @Post('count')
  countWithdrawalCustom(@Body() countDto: object) {
    return this.withdrawalService.countWithdrawalCustom(countDto);
  }

  @Post('custom')
  getWithdrawwalCustom(@Body() customDto: object) {
    return this.withdrawalService.getWithdrawalCustom(customDto);
  }

  @Get()
  getAllWithdrawals(): Promise<Withdrawal[]> {
    return this.withdrawalService.getAllWithdrawals();
  }

  @Get(':id')
  getWithdrawalById(@Param('id') withdrawalId: string): Promise<Withdrawal> {
    return this.withdrawalService.getWithdrawalById(withdrawalId);
  }

  @Put('updateStatus/:id')
  modifyWithdrawalStatus(
    @Param('id') withdrawalId: string,
    @Body() modifyWithdrawalDto: ModifyWithdrawalDto,
  ): Promise<Withdrawal> {
    return this.withdrawalService.modifyWithdrawalStatus(
      withdrawalId,
      modifyWithdrawalDto,
    );
  }
}
