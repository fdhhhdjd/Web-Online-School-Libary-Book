//! MEMORY CACHE
const { REDIS_MASTER } = require('../db/init_multiple_redis');
/**
 * @author Nguyễn Tiến Tài
 * @param {key, value, ttl}
 * @created_at 30/03/2023
 * @description Redis Publish Server Send Telegram
 *  @returns {Object}
 */

const queueMessageTelegram = async (key, value) => {
    console.info(key, '----');
    const key_convert = key;
    const value_convert = JSON.stringify(value);
    try {
        // send email here
        const publishResult = await REDIS_MASTER.publish(key_convert, value_convert);
        console.info(`Published to ${publishResult} subscribers.`);
    } finally {
        console.info('Del success');
    }
};
module.exports = {
    queueMessageTelegram,
};
