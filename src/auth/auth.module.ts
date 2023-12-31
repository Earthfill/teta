import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Staff, StaffSchema } from './schemas';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stategies/jwt.strategy';
import { JwtRefreshStrategy } from './stategies/jwtRefresh.strategy';
import { SendmailService } from 'src/sendmail/sendmail.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: Staff.name, schema: StaffSchema }]),
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy, SendmailService],
  exports: [AuthService, JwtStrategy, JwtRefreshStrategy, PassportModule],
})
export class AuthModule {}
