import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: jest.Mocked<HealthCheckService>;
  let httpHealthIndicator: jest.Mocked<HttpHealthIndicator>;

  beforeEach(async () => {
    const mockHealthCheckService = {
      check: jest.fn().mockResolvedValue({
        status: 'ok',
        info: {},
        error: {},
        details: {},
      }),
    };

    const mockHttpHealthIndicator = {
      pingCheck: jest.fn().mockResolvedValue({
        self: {
          status: 'up',
        },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
        {
          provide: HttpHealthIndicator,
          useValue: mockHttpHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get(HealthCheckService);
    httpHealthIndicator = module.get(HttpHealthIndicator);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should perform health check', async () => {
    const result = await controller.check();

    expect(healthCheckService.check).toHaveBeenCalled();
    expect(result).toEqual({
      status: 'ok',
      info: {},
      error: {},
      details: {},
    });
  });
});
