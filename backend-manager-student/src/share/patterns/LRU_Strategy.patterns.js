const LRU = require('lru-cache');
const CONFIGS = require('../configs/config');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 22/12/2022
 * @description File Algorithm Cache LRU 
 */
class LRUCache {
    constructor(size) {
        this._cache = new LRU({ max: +size || 100 });
    }

    putCache(key, val) {
        try {
            this._cache.set(key, val);
            return true;
        } catch (error) {
            throw new Error(`Error adding key ${key} to cache: ${error}`);
        }
    }

    getCache(key) {
        try {
            const hasKey = this._cache.has(key);
            if (hasKey) {
                const val = this._cache.get(key);
                return val;
            }
            return -1;
        } catch (error) {
            throw new Error(`Error getting key ${key} from cache: ${error}`);
        }
    }

    delCache(key) {
        try {
            this._cache.delete(key);
            return true;
        } catch (error) {
            throw new Error(`Error deleting key ${key} from cache: ${error}`);
        }
    }
}
const globalCache = new LRUCache(CONFIGS.MAX_LRU);
module.exports = {
    globalCache,
};
