const { REDIS_MASTER } = require('../db/init_multiple_redis');
/**
 * @author Nguyễn Tiến Tài
 * @param {key, value, ttl}
 * @created_at 04/02/2023
 * @description set key value ttl
 *  @returns {string}
 */
const setCacheEx = (key, value, ttl) => REDIS_MASTER.set(key, value, 'EX', ttl);
/**
 * @author Nguyễn Tiến Tài
 * @param {key}
 * @created_at 04/02/2023
 * @description get key
 *  @returns {string}
 */
const getCache = (key) => REDIS_MASTER.get(key);
/**
 * @author Nguyễn Tiến Tài
 * @param {key, start, end}
 * @created_at 04/02/2023
 * @description get key
 *  @returns {string}
 */
const getRangeCache = (key, start, end) => REDIS_MASTER.lrange(key, start, end);

/**
 * @author Nguyễn Tiến Tài
 * @param {key, accept_token, refresh_token, ttl}
 * @created_at 05/02/2023
 * @description Set multi
 *  @returns {Array}
 */
const setBlackListCache = (key, user_id, accept_token, refresh_token, ttl) =>
    REDIS_MASTER.multi()
        .lpush(key, accept_token, refresh_token)
        .del(user_id)
        .expire(key, ttl)
        .exec((err, replies) => {
            if (err) {
                console.error(err);
            } else {
                console.info(replies);
            }
        });
/**
 * @author Nguyễn Tiến Tài
 * @param {key}
 * @created_at 04/02/2023
 * @description Del key
 *  @returns {string}
 */
const delKeyCache = (key) => REDIS_MASTER.del(key);

/**
 * @author Nguyễn Tiến Tài
 * @param {key}
 * @created_at 06/02/2023
 * @description Set and Del key
 *  @returns {Array}
 */
const setAndDelKeyCache = (key, value, ttl) => {
    REDIS_MASTER.multi()
        .del(key)
        .set(key, value, 'EX', ttl)
        .exec((err, replies) => {
            if (err) {
                console.error(err);
            } else {
                console.info(replies);
            }
        });
};
module.exports = {
    setCacheEx,
    getCache,
    getRangeCache,
    setBlackListCache,
    delKeyCache,
    setAndDelKeyCache,
};
