import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { FundsTransferResponse } from './provider';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('transfer')
  async transfer(@Body() transferData: any): Promise<FundsTransferResponse> {
    return this.paymentService.transferFunds(transferData);
  }
}
