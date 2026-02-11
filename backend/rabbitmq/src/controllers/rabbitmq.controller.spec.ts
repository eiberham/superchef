import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqController } from './rabbitmq.controller';
import { SendMailUsecase } from '../application/send-mail.usecase';

describe('RabbitmqController', () => {
  let rabbitmqController: RabbitmqController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RabbitmqController],
      providers: [SendMailUsecase],
    }).compile();

    rabbitmqController = app.get<RabbitmqController>(RabbitmqController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const data = {
        name: '',
        to: '',
        subject: '',
        body: '',
      };
      expect(rabbitmqController.handleSendEmail(data)).toHaveBeenCalled();
    });
  });
});
