import { Controller, Get, UseGuards } from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Get('bank-data')
  async getBankData(): Promise<any> {
    try {
      const bankData = await this.paystackService.getBankData();
      return bankData;
    } catch (error) {
      throw error;
    }
  }
}
