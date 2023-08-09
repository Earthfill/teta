import { Module } from '@nestjs/common';
import { SendmailController } from './sendmail.controller';
import { SendmailService } from './sendmail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
    }),
  ],
  controllers: [SendmailController],
  providers: [SendmailService],
})
export class SendmailModule {}
