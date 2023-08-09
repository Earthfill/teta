import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendmailService {
  constructor(private mailerService: MailerService) {}

  async sendMail({ recipient, subject, content }: SendmailInterface) {
    try {
      await this.mailerService.sendMail({
        to: recipient,
        from: 'noreply@firazi.com',
        subject: subject,
        text: content,
        html: '<div>$(content)</div>',
      });
      return 'mail sent';
    } catch (error) {
      console.log(error);
    }
  }
}
