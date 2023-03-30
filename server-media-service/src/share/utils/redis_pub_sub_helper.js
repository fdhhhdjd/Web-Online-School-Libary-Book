//! MEMORY CACHE
const { REDIS_MASTER } = require('../db/init_multiple_redis');

//! SHARE
const CONSTANTS = require('../configs/constants');
const HELPER = require('./helper');

/**
 * @author Nguyễn Tiến Tài
 * @param {key, value}
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

/**
 * @author Nguyễn Tiến Tài
 * @param {err, name, port}
 * @created_at 30/03/2023
 * @description Redis Publish Server Send Telegram
 *  @returns {Object}
 */
const handleException = (err, name, port) => {
    console.error('Unhandled Exception:', err);
    const message = HELPER.getURIFromTemplate(CONSTANTS.STRING_SERVER.URL, {
        name,
        port: port || '',
        errorName: err.name,
        errorMessage: err.message,
    });
    // Publish data queue Redis
    return queueMessageTelegram(CONSTANTS.QUEUE.REDIS_SERVER_MEDIA, {
        message,
    });
};
module.exports = {
    queueMessageTelegram,
    handleException,
};
