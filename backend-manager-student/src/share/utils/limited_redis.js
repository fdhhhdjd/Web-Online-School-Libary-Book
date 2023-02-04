const { REDIS_MASTER } = require('../db/init_multiple_redis');
/**
 * @author Nguyễn Tiến Tài
 * @param {string} address_ip
 * @created_at 04/02/2023
 * @description set key value ttl
 *  @returns {string:"OK"}
 */
const setCacheEx = (key, value, ttl) => REDIS_MASTER.set(key, value, 'EX', ttl);
/**
 * @author Nguyễn Tiến Tài
 * @param {string} address_ip
 * @created_at 04/02/2023
 * @description get key
 *  @returns {string}
 */
const getCache = (key) => REDIS_MASTER.get(key);
module.exports = { setCacheEx, getCache };
