import { Redis } from "ioredis";
require("dotenv").config();

const redisClient = () => {
  try {
    const redis = new Redis({
      host: "stunning-wombat-42762.upstash.io",
      port: 6379,
      username: "default",
      password: "AacKAAIjcDE2OTZkNmQ5ZmYzNDU0MzhhYTBjMDBhMjk3NWQ0YzRlZXAxMA",
      tls: {}, // Enable TLS without additional options
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
      retryStrategy(times: number) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    redis.on("connect", () => {
      console.log("Redis connected successfully");
    });

    redis.on("error", (error) => {
      console.error("Redis connection error:", error.message);
    });

    // Test the connection
    redis
      .ping()
      .then(() => {
        console.log("Redis PING successful");
      })
      .catch((err) => {
        console.error("Redis PING failed:", err);
      });

    return redis;
  } catch (error) {
    console.error("Redis client initialization error:", error);
    throw error;
  }
};

export const redis = redisClient();
