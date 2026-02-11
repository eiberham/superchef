import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async set(key: string, value: string) {
    await this.redis.set(key, value, 'EX', 9e2); // 15 minutes expiration
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async del(key: string) {
    return this.redis.del(key);
  }

  async hincrby(hash: string, key: string, increment: number) {
    return this.redis.hincrby(hash, key, increment);
  }

  async hset(hash: string, key: string, value: string) {
    return this.redis.hset(hash, key, value);
  }

  async hgetall(hash: string): Promise<Record<string, string>> {
    return this.redis.hgetall(hash);
  }
}
