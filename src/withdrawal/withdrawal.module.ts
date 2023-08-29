import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Withdrawal, WithdrawalSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Withdrawal.name,
        schema: WithdrawalSchema,
      },
    ]),
  ],
  providers: [WithdrawalService],
  controllers: [WithdrawalController],
})
export class WithdrawalModule {}
