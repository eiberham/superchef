import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('Superchef', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should authenticate successfully', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin@example.com',
        password: 'admin',
        deviceId: 'device-id-1234',
        deviceType: 'iPhone 12',
        deviceName: 'My iPhone',
      })
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
  });
});
