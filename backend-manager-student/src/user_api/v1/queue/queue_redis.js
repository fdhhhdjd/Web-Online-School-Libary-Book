//! LIBRARY
const IOREDIS = require('ioredis');

//! SERVICE
const book_user = require('./book_user/book.user');

//! SHARE
const CONSTANTS = require('../../../share/configs/constants');
const CONFIGS = require('../../../share/configs/config');

//! DB
const REDIS_MASTER = new IOREDIS({
    port: CONFIGS.REDIS_PORT,
    host: CONFIGS.REDIS_HOST,
    user: CONFIGS.REDIS_USER,
    password: CONFIGS.REDIS_PASSWORD,
});

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/03/2023
 * @description Setup Redis PubSub Server USER_API.
 */

//! New Map Users
const userChannelHandlers = new Map();
userChannelHandlers.set(CONSTANTS.DELETE_KEY_CACHE_LRU, book_user.deleteKeyLRU);

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
