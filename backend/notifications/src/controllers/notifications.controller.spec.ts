import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { SendMailUsecase } from '../application/send-mail.usecase';
import { EmailService } from '../infrastructure/email.service';
import { RmqContext } from '@nestjs/microservices';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;
  let emailService: jest.Mocked<EmailService>;

  beforeEach(async () => {
    const mockEmailService = {
      send: jest.fn().mockResolvedValue(undefined),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        SendMailUsecase,
        {
          provide: EmailService,
          useValue: mockEmailService,
        },
      ],
    }).compile();

    notificationsController = app.get<NotificationsController>(NotificationsController);
    emailService = app.get(EmailService);
  });

  describe('handleSendEmail', () => {
    it('should handle send email message', async () => {
      const emailData = {
        name: 'John Doe',
        to: 'john@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
      };
      
      // The controller expects UserRegisteredPayload format with data as JSON string
      const userRegisteredPayload = {
        data: JSON.stringify(emailData)
      };
      
      const rmqContext = {
        getMessage: jest.fn().mockReturnValue({ 
          content: Buffer.from(JSON.stringify(userRegisteredPayload)) 
        }),
        getChannelRef: jest.fn().mockReturnValue({
          ack: jest.fn(),
          nack: jest.fn(),
        }),
        getPattern: jest.fn(),
      } as unknown as RmqContext;

      await notificationsController.handleSendEmail(rmqContext);

      expect(emailService.send).toHaveBeenCalledWith(
        emailData.name,
        emailData.to,
        emailData.subject,
        emailData.body
      );
    });
  });
});
