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
 * @created_at 14/02/2023
 * @description Set and Del key BlackList
 *  @returns {Array}
 */
const setAndDelKeyBlackListCache = (key, key_black_lits, refresh_token, refresh_token_cookie, ttl_set, ttl_push) => {
    REDIS_MASTER.multi()
        .del(key)
        .set(key, refresh_token, 'EX', ttl_set)
        .lpush(key_black_lits, refresh_token_cookie)
        .expire(key_black_lits, ttl_push)
        .exec((err, replies) => {
            if (err) {
                console.error(err);
            } else {
                console.info(replies);
            }
        });
};
/**
 * @author Nguyễn Tiến Tài
 * @param {key}
 * @created_at 15/02/2023
 * @description Block account 24h wrong password 5 times
 *  @returns {Array}
 */
const setAccountLoginWrongCache = (key, ttl) => {
    REDIS_MASTER.multi()
        .incr(key)
        .expire(key, ttl)
        .exec((err, replies) => {
            if (err) {
                console.error(err);
            } else {
                console.info(replies);
            }
        });
};
/**
 * @author Nguyễn Tiến Tài
 * @param {key}
 * @created_at 15/02/2023
 * @description Time ttl key redis
 *  @returns {Array}
 */
const getExpirationTime = async (key) => {
    const ttl = await REDIS_MASTER.pttl(key);
    const timeToLive = Math.ceil(ttl / 1000);
    const seconds = timeToLive % 60;
    const minutes = Math.floor(timeToLive / 60) % 60;
    const hours = Math.floor(timeToLive / 3600) % 24;
    const days = Math.floor(timeToLive / (3600 * 24));
    const timeLeft = `${days} Day, ${hours} Hour, ${minutes} Minute, ${seconds} Millisecond`;
    const time_full = {
        days,
        hours,
        minutes,
        seconds,
        timeLeft,
    };
    return time_full;
};

module.exports = {
    setCacheEx,
    getCache,
    getRangeCache,
    setBlackListCache,
    delKeyCache,
    setAndDelKeyBlackListCache,
    setAccountLoginWrongCache,
    getExpirationTime,
};
