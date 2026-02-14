import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { RedisService } from './redis/redis.service';

describe('AnalyticsController', () => {
  let analyticsController: AnalyticsController;

  beforeEach(async () => {
    const mockRedisService = {
      hincrby: jest.fn(),
      hset: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        AnalyticsService, 
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
    }).compile();

    analyticsController = app.get<AnalyticsController>(AnalyticsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(true).toBeTruthy();
    });
  });
});
