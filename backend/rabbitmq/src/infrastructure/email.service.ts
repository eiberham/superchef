import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async send(
    name: string,
    email: string,
    subject: string,
    body: string,
  ): Promise<void> {
    try {
      const response = await this.resend.emails.send(
        {
          from: 'no-reply <delivered+superchef@resend.dev>',
          to: [email],
          subject,
          html: '<h1>Hello ' + name + '</h1><p>' + body + '</p>',
        },
        {
          idempotencyKey: `${email}-${Date.now()}`,
        },
      );

      if (response.error) {
        throw new Error(response.error.message);
      }
    } catch (error) {
      throw error;
    }
  }
}
