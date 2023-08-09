import { Body, Controller, Post } from '@nestjs/common';
import { SendmailService } from './sendmail.service';

@Controller('sendmail')
export class SendmailController {
  constructor(private sendmailService: SendmailService) {}

  @Post()
  sendmail(
    @Body()
    sendmailcredentials: {
      recipient: string;
      subject: string;
      content: string;
    },
  ) {
    return this.sendmailService.sendMail({
      recipient: sendmailcredentials.recipient,
      subject: 'testing',
      content: 'Just testing mail',
    });
  }
}
