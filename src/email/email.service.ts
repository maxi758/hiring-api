import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {
    const key = this.configService.get<string>('SENDGRID_API_KEY');
    sendgrid.setApiKey(key);
  }
  async send(
    email: string,
    //transaction: ,
  ): Promise<void> {
    try {
      const msg = {
        personalizations: [{ to: [{ email }] }],
        from: 'maxi758@gmail.com',
        subject: 'transaction details',
        templateId: this.configService.get<string>('TEMPLATE_ID'),
        //dynamicTemplateData: { ...transaction },
      };

      await sendgrid.send(msg);
    } catch (e) {
      console.error(e.response.body);
    }
  }
}
