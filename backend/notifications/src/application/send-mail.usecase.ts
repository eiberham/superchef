import { Injectable } from '@nestjs/common';
import type { Email } from '../domain/email.interface';
import { EmailService } from '../infrastructure/email.service';

@Injectable()
export class SendMailUsecase {
  constructor(private readonly email: EmailService) {}
  async send(data: Email): Promise<void> {
    const { name, to, subject, body } = data;
    return this.email.send(name, to, subject, body);
  }
}
