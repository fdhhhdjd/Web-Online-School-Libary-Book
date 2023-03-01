const REDIS_MASTER = require('../db/init_multiple_redis');

/**
 * @author Nguyễn Tiến Tài
 * @param {key, start, end}
 * @created_at 03/01/2023
 * @description get key arr
 *  @returns {string}
 */
const getRangeCache = (key, start, end) => REDIS_MASTER.lrange(key, start, end);

module.exports = {
    getRangeCache
};
