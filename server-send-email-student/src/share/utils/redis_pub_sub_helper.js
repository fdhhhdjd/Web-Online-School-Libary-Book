const CONSTANTS = require('../configs/constants');

const { REDIS_MASTER } = require('../db/init_multiple_redis');
const MEMORY_CACHE = require('./limited_redis');

/**
 * @author Nguyễn Tiến Tài
 * @param {key, value, ttl}
 * @created_at 19/02/2023
 * @description Redis Publish,use solution distributed lock
 *  @returns {Object}
 */
const sendEmailWithLock = async (key, value) => {
    const key_convert = `send-email:${key}`;
    const value_convert = JSON.stringify({ value });
    const lockKey = `lock:${key_convert}`;
    const ttl = CONSTANTS._30_SECONDS_REDIS;

    // set key with option NX and EX
    const setKeyResult = await MEMORY_CACHE.setCacheExAndNx(lockKey, value_convert, ttl);

    if (setKeyResult === CONSTANTS.RESULT_REDIS) {
        try {
            // send email here
            const publishResult = await REDIS_MASTER.publish(lockKey, value_convert);
            console.info(`Published to ${publishResult} subscribers.`);
        } finally {
            console.info('Del success');
            // release lock by deleting the key
            await MEMORY_CACHE.delKeyCache(lockKey);
        }
    } else {
        throw new Error('Cannot acquire lock.');
    }
};
module.exports = {
    sendEmailWithLock,
};
