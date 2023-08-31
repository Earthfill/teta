import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TravellerModule } from './traveller/traveller.module';
import { PackageModule } from './package/package.module';
import { StaffModule } from './staff/staff.module';
import { SendmailModule } from './sendmail/sendmail.module';
import { UserModule } from './user/user.module';
import { OperatorModule } from './operator/operator.module';
import { AgentModule } from './agent/agent.module';
import { BlogModule } from './blog/blog.module';
import { ReviewModule } from './review/review.module';
import { WithdrawalModule } from './withdrawal/withdrawal.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://ulevaldevelopers:5khfa22BEkSaiktZ@cluster0.vpbatfi.mongodb.net/uleval?retryWrites=true&w=majority',
    ),
    TravellerModule,
    PackageModule,
    StaffModule,
    SendmailModule,
    UserModule,
    OperatorModule,
    AgentModule,
    BlogModule,
    ReviewModule,
    WithdrawalModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
