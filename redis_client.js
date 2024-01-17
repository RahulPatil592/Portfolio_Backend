// const redis = require('redis');
import redis from "redis"

const REDIS_PORT = process.env.REDIS_PORT || 6379
let client;
(async () => {
  client = redis.createClient({ url: "redis://redis-server:6379", })
  client.on("error", (error) => { console.log(error) });
  await client.connect()
})()


export default client