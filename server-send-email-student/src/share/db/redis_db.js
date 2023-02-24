const IOREDIS = require('ioredis');
const CONFIGS = require('../configs/config');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 22/01/2023
 * @description Connect Cache Redis Master and Slave
 */
const ConnectionRedis = (REDIS) => {
    REDIS.on('connect', function () {
        console.info(`Client connected to redis Push ${JSON.stringify(this.options.user)}`);
    });
    REDIS.on('ready', function () {
        console.info(`Client connected to redis push and ready to use ${JSON.stringify(this.options.host)}...`);
    });
    REDIS.on('error', (error) => {
        console.info(error);
    });
    REDIS.on('end', function () {
        console.info(`Client disconnected from redis push ${JSON.stringify(this.options.user)}`);
    });
    REDIS.on('SIGINT', () => {
        REDIS.quit();
    });
};

const REDIS_MASTER = new IOREDIS({
    port: CONFIGS.REDIS_PORT,
    host: CONFIGS.REDIS_HOST,
    user: CONFIGS.REDIS_USER,
    password: CONFIGS.REDIS_PASSWORD,
});
ConnectionRedis(REDIS_MASTER);

module.exports = {
    REDIS_MASTER,
};
