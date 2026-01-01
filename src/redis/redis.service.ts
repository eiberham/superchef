import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  ) {}

  async set(key: string, value: string) {
    await this.redis.set(key, value);
  }

  async get(key: string) {
    return this.redis.get(key);
  }
}