//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const borrow_book_model = require('../../../../share/models/book_borrowed.model');
const book_model = require('../../../../share/models/book.model');

//! SERVICE
const book_admin_service = require('../../../../share/services/admin_service/book_service');

const BorrowBookController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 08/02/2022
     * @description update BorrowBook
     * @function updateBorrowBook
     * @return {Object:{Number,String}
     */
    updateBorrowBook: async (req, res) => {
        const {
            book_id, user_id, start_date, due_date, status,
        } = req.body.input.borrow_book_input;

        // Check input
        if (!book_id || !user_id || !start_date || !due_date || !status) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
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
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_NOT_BOOK,
                    },
                });
            }

            if (data_book[0].status === status) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_UPDATE_BORROW,
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
                    return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                        status: CONSTANTS.HTTP.STATUS_2XX_OK,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                        element: {
                            result: MESSAGES.GENERAL.SUCCESS_UPDATE_BORROW,
                        },
                    });
                }
                if (err) {
                    return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                        status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
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

                    // Delete Cache
                    book_admin_service.handleDeleteCache(key_cache_book_detail, CONSTANTS.KEY_REDIS.ALL_BOOK);

                    return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                        status: CONSTANTS.HTTP.STATUS_2XX_OK,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                        element: {
                            result: MESSAGES.GENERAL.SUCCESS_UPDATE_BORROW_STUDENT_REFUND,
                        },
                    });
                }
                if (err) {
                    return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                        status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    });
                }
            }
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.NOTFOUND,
                },
            });
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/03/2022
     * @description Get All Borrowed Book
     * @function borrowBook
     * @return {Object:{Number,String}}
     */
    getAllBorrowBook: async (req, res) => {
        try {
            // Take data db
            const result_borrow_book = await borrow_book_model.getBorrowBook();

            if (result_borrow_book) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_borrow_book,
                    },
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
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
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Take data db
            const result_borrow_book_detail = await borrow_book_model.getBorrowBook(borrowed_book_id);

            if (result_borrow_book_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_borrow_book_detail,
                    },
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
};
module.exports = BorrowBookController;
