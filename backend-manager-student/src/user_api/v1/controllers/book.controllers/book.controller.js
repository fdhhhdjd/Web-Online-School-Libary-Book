//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const RANDOMS = require('../../../../share/utils/random');
const MEMORY_CACHE = require('../../../../share/utils/limited_redis');
//! MIDDLEWARE
const { globalCache } = require('../../../../share/patterns/LRU_Strategy.patterns');
const { returnReasons } = require('../../../../share/middleware/handle_error');
//! MODEL
const book_model = require('../../../../share/models/book.model');
const book_admin_service = require('../../../../share/services/admin_service/book_service');

const bookController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2022
     * @description detail book
     * @function getDetailBook
     * @return {Object:{Number,String}
     */
    getDetailBook: async (req, res) => {
        const book_id = req.params.book_id;

        // Check input
        if (!book_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // Create key Cache
            const key_cache_book_detail = HELPER.getURIFromTemplate(CONSTANTS.KEY_REDIS.DETAIL_BOOK, {
                book_id,
            });

            // detail book database
            const cache_lru_book = globalCache.getCache(key_cache_book_detail);
            if (cache_lru_book !== CONSTANTS.NO) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: cache_lru_book,
                    },
                });
            }
            // detail book database
            const result_book_detail = await book_model.getBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );

            if (result_book_detail) {
                // Add data cache lru argothim
                book_admin_service.handleSetCacheLRU(key_cache_book_detail, result_book_detail[0]);

                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_book_detail[0],
                    },
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2022
     * @description Get all book
     * @function getAllBook
     * @return {Object:{Number,String}
     */
    getAllBook: async (req, res) => {
        try {
            // Detail book database
            const cache_redis_book = await MEMORY_CACHE.getCache(CONSTANTS.KEY_REDIS.ALL_BOOK);
            if (cache_redis_book) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: JSON.parse(cache_redis_book),
                    },
                });
            }

            // Take data db
            const result_book = await book_model.getAllBook({ isdeleted: CONSTANTS.DELETED_DISABLE }, '*');
            if (result_book) {
                const redisTTLWithRandom = RANDOMS.getRedisTTLWithRandom(CONSTANTS._1_MONTH);
                // Add data redis
                book_admin_service.handleSetCacheRedis(CONSTANTS.KEY_REDIS.ALL_BOOK, result_book, redisTTLWithRandom);

                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_book,
                    },
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
};
module.exports = bookController;
