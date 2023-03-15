//! LIBRARY
const IOREDIS = require('ioredis');

//! SHARE
const CONSTANTS = require('../configs/constants');
const CONFIGS = require('../configs/config');

//! Queue
const { userChannelHandlers } = require('../../user_api/v1/queue/queue_redis');

//! DB
const REDIS_MASTER = new IOREDIS({
    port: CONFIGS.REDIS_PORT,
    host: CONFIGS.REDIS_HOST,
    user: CONFIGS.REDIS_USER,
    password: CONFIGS.REDIS_PASSWORD,
});

//! Start Subscribe to user
REDIS_MASTER.on('ready', async () => {
    try {
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_USER_EXIT_U}`);

        console.info(`Redis subscribed to all channels starting with ${CONSTANTS.KEY_USER_EXIT_U}`);
    } catch (error) {
        console.error('Failed to subscribe to Redis channels:', error);
    }
});

//! Take queue Sub of Pub
REDIS_MASTER.on('pmessage', async (pattern, channel, message) => {
    console.info(pattern, '::::::::pattern');
    const handler = userChannelHandlers.get(channel);
    if (handler) {
        try {
            handler(JSON.parse(message));
        } catch (error) {
            console.error(`Error processing Redis message on channel ${channel}:`, error);
        }
    }
});
