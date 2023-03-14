//! MIDDLAWRE
const { globalCache } = require('../../../../share/patterns/LRU_Strategy.patterns');

//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');

const queueBookUser = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/03/2023
     * @description Queue delete key LRU
     * @function deleteKeyLRU
     * @return { Object }
     */
    deleteKeyLRU: async (message_sub) => {
        try {
            // Check Key lru argothim
            const check_key_lru_book_detail = globalCache.exitKeyCache(message_sub.result);
            if (check_key_lru_book_detail === CONSTANTS.YES) {
                // Add data cache lru argothim
                globalCache.delCache(message_sub.result);
            }
            return false;
        } catch (error) {
            return true;
        }
    },
};
module.exports = queueBookUser;
