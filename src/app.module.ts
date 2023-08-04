import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TravellerModule } from './traveller/traveller.module';
import { PackageModule } from './package/package.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://adebisi:oBl9SyqxKGEboqYw@sendmedb.mdupyr4.mongodb.net/?retryWrites=true&w=majority',
    ),
    TravellerModule,
    PackageModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
