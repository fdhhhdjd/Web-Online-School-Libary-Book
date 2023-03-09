//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');

//! MIDDLEWARE
const { globalCache } = require('../../../../share/patterns/LRU_Strategy.patterns');
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const borrow_book_model = require('../../../../share/models/book_borrowed.model');
const book_model = require('../../../../share/models/book.model');

const BorrowBookController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 08/02/2022
     * @description update BorrowBook
     * @function updateBorrowBook
     * @return {Object:{Number,String}
     */
    updateBorrowBook: async (req, res) => {
        const { book_id, user_id, start_date, due_date, status } = req.body.input.borrow_book_input;

        // Check input
        if (!book_id || !user_id || !start_date || !due_date || !status) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        const data_update = {
            book_id,
            user_id,
            start_date,
            due_date,
            status,
        };
        let data_book;
        try {
            // Check data book exits
            data_book = await borrow_book_model.getBorrowBookById(
                { book_id, user_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { status: 'status' },
            );

            if (!data_book.length) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            if (data_book[0].status === status) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Already update borrow book !',
                    },
                });
            }
            let err;
            let result;
            if (status === CONSTANTS.STATUS_BORROW.BORROWING) {
                // update book database
                [err, result] = await HELPER.handleRequest(
                    borrow_book_model.updateBorrowBook(
                        data_update,
                        { book_id, user_id },
                        { borrowed_book_id: 'borrowed_book_id' },
                    ),
                );
                if (result) {
                    return res.status(200).json({
                        status: 200,
                        message: returnReasons('200'),
                        element: {
                            result: 'Update Student borrow book success !',
                        },
                    });
                }
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: returnReasons('500'),
                    });
                }
            } else if (status === CONSTANTS.STATUS_BORROW.DONE) {
                // Check data book exits
                data_book = await book_model.getBookById(
                    { book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                    { quantity: 'quantity' },
                );
                const data_update_book = {
                    book_id,
                    quantity: data_book[0].quantity + 1,
                };
                const data_update_borrow = {
                    book_id,
                    user_id,
                    status,
                };
                // update book database
                [err, result] = await HELPER.handleRequest(
                    borrow_book_model.transactionUpdateBorrowBook(data_update_book, data_update_borrow),
                );
                if (result) {
                    // Create key Cache
                    const key_cache_book_detail = HELPER.getURIFromTemplate(CONSTANTS.KEY_REDIS.DETAIL_BOOK, {
                        book_id,
                    });
                    // Delete data cache lru argothim
                    globalCache.delMultiCache(CONSTANTS.KEY_REDIS.ALL_BOOK, key_cache_book_detail);

                    return res.status(200).json({
                        status: 200,
                        message: returnReasons('200'),
                        element: {
                            result: 'Update Student return book success !',
                        },
                    });
                }
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: returnReasons('500'),
                    });
                }
            }
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
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
     * @created_at 09/03/2022
     * @description Get All Borrowed Book
     * @function borrowBook
     * @return {Object:{Number,String}
     */
    getAllBorrowBook: async (req, res) => {
        try {
            // Take data db
            const result_borrow_book = await borrow_book_model.getBorrowBook();

            if (result_borrow_book) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_borrow_book,
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
     * @created_at 09/03/2022
     * @description Get All Borrowed Book
     * @function borrowBook
     * @return {Object:{Number,String}
     */
    getDetailBorrowBook: async (req, res) => {
        const borrowed_book_id = req.params.borrowed_book_id;

        // Check input
        if (!borrowed_book_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // Take data db
            const result_borrow_book_detail = await borrow_book_model.getBorrowBook(borrowed_book_id);

            if (result_borrow_book_detail) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_borrow_book_detail,
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
module.exports = BorrowBookController;
