//! CACHING
const { REDIS_MASTER, REDIS_SLAVE } = require('../db/init_multiple_redis');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 08/01/2023
 * @description Handle promise settimeout Redis Cluster
 * @param {REDIS_MASTER OR REDIS_SLAVE,String}
 * @return {resolve or reject}
 */
const getDataWithTimeout = async (redisClient, key) =>
    await new Promise((resolve, reject) => {
        redisClient.get(key, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
        setTimeout(() => reject(new Error('Timeout')), 3000);
    });

/**
 * @author Nguyễn Tiến Tài
 * @created_at 08/01/2023
 * @description Check if master fail -> slave -> fail -> server err
 * @param {String}
 * @return {data}
 */
const getDataCluster = async (key) => {
    let data;
    try {
        data = await getDataWithTimeout(REDIS_MASTER, key);
    } catch (error) {
        console.info(error);
        try {
            data = await getDataWithTimeout(REDIS_SLAVE, key);
        } catch (err) {
            console.info(err);
            data = 'Server Fail';
        }
    }
    return data;
};
module.exports = {
    getDataCluster,
};
