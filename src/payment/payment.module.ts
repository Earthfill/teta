import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { HttpModule } from '@nestjs/axios';
import { PaystackProvider, PAYMENT_PROVIDER_TOKEN } from './provider';

@Module({
  imports: [HttpModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: PAYMENT_PROVIDER_TOKEN,
      useClass: PaystackProvider,
    },
  ],
})
export class PaymentModule {}
