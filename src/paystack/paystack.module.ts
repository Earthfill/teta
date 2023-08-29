import { Module } from '@nestjs/common';
import { PaystackController } from './paystack.controller';
import { PaystackService } from './paystack.service';

@Module({
  controllers: [PaystackController],
  providers: [PaystackService],
})
export class PaystackModule {}
