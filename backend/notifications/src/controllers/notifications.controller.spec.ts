import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { SendMailUsecase } from '../application/send-mail.usecase';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [SendMailUsecase],
    }).compile();

    notificationsController = app.get<NotificationsController>(NotificationsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const data = {
        name: '',
        to: '',
        subject: '',
        body: '',
      };
      expect(notificationsController.handleSendEmail(data)).toHaveBeenCalled();
    });
  });
});
