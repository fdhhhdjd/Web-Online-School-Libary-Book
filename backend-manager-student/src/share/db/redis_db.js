const IOREDIS = require('ioredis');
const CONFIGS = require('../configs/config');

const REDIS = new IOREDIS({
    port: CONFIGS.REDIS_PORT,
    host: CONFIGS.REDIS_HOST,
    user: CONFIGS.REDIS_USER,
    password: CONFIGS.REDIS_PASSWORD,
});

REDIS.on('connect', () => {
    console.info('Client connected to redis Push...');
});
REDIS.on('ready', () => {
    console.info('Client connected to redis push and ready to use...');
});
REDIS.on('error', (error) => {
    console.info(error);
});
REDIS.on('end', () => {
    console.info('Client disconnected from redis push');
});
REDIS.on('SIGINT', () => {
    REDIS.quit();
});

module.exports = REDIS;
