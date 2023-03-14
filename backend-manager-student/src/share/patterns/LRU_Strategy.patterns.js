//! LIBRARY
const LRU = require('lru-cache');

//! SHARE
const CONFIGS = require('../configs/config');
const CONSTANTS = require('../configs/constants');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 22/12/2022
 * @updaed_at 14/03/2023
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
            return CONSTANTS.NO;
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

    exitKeyCache(key) {
        try {
            const hasKey = this._cache.has(key);
            if (hasKey) {
                return CONSTANTS.YES;
            }
            return CONSTANTS.NO;
        } catch (error) {
            throw new Error(`Error check key ${key} from cache: ${error}`);
        }
    }

    delMultiCache(key_1, key_2) {
        try {
            this._cache.delete(key_1) && this._cache.delete(key_2);
            return true;
        } catch (error) {
            throw new Error(`Error deleting key ${key_1} and ${key_2} from cache: ${error}`);
        }
    }
}
const globalCache = new LRUCache(CONFIGS.MAX_LRU);
module.exports = {
    globalCache,
};
