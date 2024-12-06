import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from './redis.providers';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClient, // Single Redis client
  ) {}

  // Set user as online in Redis (save the current timestamp)
  async setUserOnline(userId: string): Promise<void> {
    const currentTime = Date.now();
    await this.redisClient.hset('online_users', userId, currentTime.toString());
  }

  // Set user as offline in Redis (remove user from the hash)
  async setUserOffline(userId: string): Promise<void> {
    await this.redisClient.hdel('online_users', userId);
  }

  // Get the list of online users from Redis (all keys in the 'online_users' hash)
  async getOnlineUsers(): Promise<string[]> {
    const users = await this.redisClient.hkeys('online_users');
    return users;
  }

  // Check if a user is online based on their last heartbeat
  // Optionally, you can set a timeout threshold (e.g., 5 seconds) for heartbeat freshness
  async isUserOnline(userId: string, timeout: number = 5000): Promise<boolean> {
    const lastHeartbeat = await this.redisClient.hget('online_users', userId);
    if (!lastHeartbeat) return false; // User not found, treat as offline

    const currentTime = Date.now();
    return currentTime - parseInt(lastHeartbeat) < timeout; // If the user was last active within the timeout
  }

  // Optional: Clean up users who have been offline for too long (e.g., no heartbeat)
  async cleanupInactiveUsers(timeout: number = 5000): Promise<void> {
    const onlineUsers = await this.redisClient.hkeys('online_users');
    const currentTime = Date.now();

    for (const userId of onlineUsers) {
      const lastHeartbeat = await this.redisClient.hget('online_users', userId);
      if (currentTime - parseInt(lastHeartbeat) > timeout) {
        // If the user hasn't sent a heartbeat in time
        await this.setUserOffline(userId); // Mark the user as offline
      }
    }
  }
}
