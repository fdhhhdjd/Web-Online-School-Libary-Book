//! SHARE
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');

//! MIDDLEWARE
const { globalCache } = require('../../../../share/patterns/LRU_Strategy.patterns');
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const book_model = require('../../../../share/models/book.model');

const bookController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2022
     * @description create book
     * @function createBook
     * @return {Object:{Number,String}
     */
    createBook: async (req, res) => {
        const {
            name, author_id, image_uri, description, bookshelf, language, quantity, public_id_image,
        }
            = req.body.input.author_input;

        // Check input
        if (
            !name
            || !author_id
            || !image_uri
            || !description
            || !bookshelf
            || !language
            || !quantity
            || !public_id_image
        ) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        const data_insert = {
            book_id: RANDOMS.createID(),
            name,
            author_id,
            image_uri,
            description,
            bookshelf,
            language,
            page_number: 0,
            total_comment: 0,
            total_like: 0,
            total_rating: 0,
            quantity,
            status: CONSTANTS.STATUS_BOOK.STILL,
            public_id_image,
        };
        try {
            // create book database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(book_model.createBook(data_insert));
            if (result) {
                // Delete data cache lru argothim
                globalCache.delCache(CONSTANTS.KEY_REDIS.ALL_BOOK);

                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].book_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
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
     * @created_at 03/02/2022
     * @description update book
     * @function updateBook
     * @return {Object:{Number,String}
     */
    updateBook: async (req, res) => {
        const {
            book_id,
            name,
            author_id,
            image_uri,
            description,
            bookshelf,
            language,
            quantity,
            status,
            public_id_image,
        } = req.body.input.book_input;

        // Check input
        if (
            !book_id
            || !name
            || !author_id
            || !image_uri
            || !description
            || !bookshelf
            || !language
            || !quantity
            || !public_id_image
        ) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        const data_update = {
            name,
            author_id,
            image_uri,
            description,
            bookshelf,
            language,
            quantity,
            status,
            public_id_image,
        };
        try {
            // update book database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                book_model.updateBook(data_update, { book_id }, { book_id: 'book_id' }),
            );
            if (result) {
                // Create key Cache
                const key_cache_book_detail = HELPER.getURIFromTemplate(CONSTANTS.KEY_REDIS.DETAIL_BOOK, {
                    book_id,
                });

                // Delete data cache lru argothim
                globalCache.delCache(key_cache_book_detail);

                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].book_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
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
     * @created_at 03/02/2022
     * @description delete book
     * @function deleteBook
     * @return {Object:{Number,String}
     */
    deleteBook: async (req, res) => {
        const { book_id } = req.body.input.book_input;

        // Check input
        if (!book_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // Check account  already delete
            const result_book_detail = await book_model.getBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_ENABLE },
                { book_id: 'book_id' },
            );

            // Check Book already delete
            if (result_book_detail.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Book already delete !',
                    },
                });
            }
            // Delete book_id database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                book_model.updateBook(
                    {
                        isdeleted: CONSTANTS.DELETED_ENABLE,
                    },
                    { book_id },
                    { book_id: 'book_id' },
                ),
            );
            if (result) {
                // Create key Cache
                const key_cache_book_detail = HELPER.getURIFromTemplate(CONSTANTS.KEY_REDIS.DETAIL_BOOK, {
                    book_id,
                });

                // Delete data cache lru argothim
                globalCache.delCache(key_cache_book_detail);

                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].book_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
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
     * @created_at 03/02/2022
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
            if (cache_lru_book !== -1) {
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
                globalCache.putCache(key_cache_book_detail, result_book_detail[0]);

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
     * @created_at 03/02/2022
     * @description Get all book
     * @function getAllBook
     * @return {Object:{Number,String}
     */
    getAllBook: async (req, res) => {
        try {
            // detail book database
            const cache_lru_book = globalCache.getCache(CONSTANTS.KEY_REDIS.ALL_BOOK);
            if (cache_lru_book !== -1) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: cache_lru_book,
                    },
                });
            }
            // Take data db
            const result_book_detail = await book_model.getAllBook({ isdeleted: CONSTANTS.DELETED_DISABLE }, '*');
            if (result_book_detail) {
                // Add data cache lru argothim
                globalCache.putCache(CONSTANTS.KEY_REDIS.ALL_BOOK, result_book_detail);

                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_book_detail,
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
