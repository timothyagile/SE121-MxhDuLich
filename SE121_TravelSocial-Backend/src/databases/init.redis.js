// redisClient.js
const { createClient } = require('redis');

let redisClient;

async function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient();

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    await redisClient.connect();
    console.log('✅ Redis connected');
  }

  return redisClient;
}

module.exports = getRedisClient;


// const { createClient } = require('redis');
// require('dotenv').config();

// class RedisDatabase {
//     constructor() {
//         this.connectRedis();
//     }

//     connectRedis() {
//         this.client = createClient({
//             url: process.env.REDIS_URL,
//         });

//         this.client.on('error', (err) => console.error('Redis Client Error', err));

//         (async () => {
//             await this.client.connect();
//         })();
//     }

//     static getInstance() {
//         if (!RedisDatabase.instance) {
//             RedisDatabase.instance = new RedisDatabase();
//         }
//         return RedisDatabase.instance;
//     }
// }

// const instanceRedisDb = RedisDatabase.getInstance();
// module.exports = instanceRedisDb.client;
