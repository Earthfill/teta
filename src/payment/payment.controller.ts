import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@UseGuards(AuthGuard('jwt'))
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('transfer')
  async transfer(@Body() transferData: any): Promise<any> {
    const secretKey = process.env.PAYSTACK_SECRET;
    return this.paymentService
      .transferFunds(transferData, secretKey)
      .toPromise();
  }

  @Get('transfer')
  async getTransferData(): Promise<any> {
    const secretKey = process.env.PAYSTACK_SECRET;
    return this.paymentService.getTransferData(secretKey).toPromise();
  }

  @Post('finalize')
  async finalizeTransfer(@Body() params: any): Promise<any> {
    const secretKey = process.env.PAYSTACK_SECRET;
    return this.paymentService.finalizeTransfer(params, secretKey).toPromise();
  }

  @Post('transfer-bulk')
  async transferBulk(@Body() params: any): Promise<any> {
    const secretKey = process.env.PAYSTACK_SECRET;
    return this.paymentService.transferBulk(params, secretKey).toPromise();
  }

  @Get('verify-transfer/:reference')
  verifyTransfer(@Param('reference') reference: string): Observable<any> {
    const secretKey = process.env.PAYSTACK_SECRET;
    return this.paymentService.verifyTransfer(reference, secretKey);
  }
}
