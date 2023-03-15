//! SHARE
const MEMORY_CACHE = require('../../utils/limited_redis');
const CONSTANTS = require('../../configs/constants');
const REDIS_PUB_SUB = require('../../utils/redis_pub_sub_helper');

//! MIDDLEWARE
const { globalCache } = require('../../patterns/LRU_Strategy.patterns');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 14/03/2023
     * @description Delete Cache
     * @function handleDeleteCache
     */
    handleDeleteCache: async (key_cache_lru, key_cache_redis) => {
        try {
            // Check Key lru argothim
            const check_key_lru_book_detail = globalCache.exitKeyCache(key_cache_lru);
            if (check_key_lru_book_detail === CONSTANTS.YES) {
                // Delete data cache lru argothim
                globalCache.delCache(key_cache_lru);
            }
            // Publish data queue Redis
            REDIS_PUB_SUB.queueMessageUserApi(CONSTANTS.DELETE_KEY_CACHE_LRU, {
                result: key_cache_lru,
            });

            // Check key Redis
            const check_key_redis_book_all = await MEMORY_CACHE.existsKeyCache(key_cache_redis);
            if (check_key_redis_book_all === CONSTANTS.YES) {
                // Delete key Redis
                MEMORY_CACHE.delKeyCache(key_cache_redis);
            }
            return false;
        } catch (error) {
            return true;
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 14/03/2023
     * @description Save Cache Redis
     * @function handleSetCacheRedis
     */
    handleSetCacheRedis: async (key_cache_redis, value, ttl) => {
        try {
            // Check key Redis
            const check_key_redis_book_all = await MEMORY_CACHE.existsKeyCache(key_cache_redis);
            if (check_key_redis_book_all === CONSTANTS.NO) {
                // Set data Redis
                MEMORY_CACHE.setCacheEx(key_cache_redis, JSON.stringify(value), ttl);
            }
            return false;
        } catch (error) {
            return true;
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 14/03/2023
     * @description Save Cache LRU
     * @function handleSetCacheRedis
     */
    handleSetCacheLRU: async (key_cache_lru, value) => {
        try {
            // Check Key lru argothim
            const check_key_lru_book_detail = globalCache.exitKeyCache(key_cache_lru);
            if (check_key_lru_book_detail === CONSTANTS.NO) {
                // Add data cache lru argothim
                globalCache.putCache(key_cache_lru, value);
            }
            return false;
        } catch (error) {
            return true;
        }
    },
};
