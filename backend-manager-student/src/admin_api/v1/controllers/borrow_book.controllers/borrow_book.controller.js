//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const RANDOMS = require('../../../../share/utils/random');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const borrow_book_model = require('../../../../share/models/book_borrowed.model');
const book_model = require('../../../../share/models/book.model');

//! SERVICE
const book_admin_service = require('../../../../share/services/admin_service/book_service');
const book_service = require('../../../../share/services/user_service/book_service');

const BorrowBookController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description create BorrowBook
     * @function updateBorrowBook
     * @return {Object:{Number,String}}
     */
    createBorrowBook: async (req, res) => {
        // Book input
        const { book_id, user_id, quantity } = req.body.input.borrow_book_input;

        if (!HELPER.validateBigInt(book_id) || !HELPER.validateBigInt(user_id) || !quantity) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        if (quantity > 2 || quantity === 0) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.EXITS_CAN_ONLY_TOW_BORROW,
                },
            });
        }
        try {
            // Check Student tow a borrow book
            const check_borrow_book = await borrow_book_model.checkBorrowBook(
                { user_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { book_id: 'book_id', status: 'status', user_id: 'user_id', quantity: 'quantity' },
            );
            // Check book lost processing
            const checkLostProcessing = (arr) => !arr.some((obj) => obj.status === CONSTANTS.STATUS_BORROW.LOST_BOOK_PROCESSING);
            const totalQuantity = check_borrow_book.reduce((acc, cur) => {
                if (cur.user_id === user_id) {
                    return acc + cur.quantity;
                }
                return acc;
            }, 0);
            const newTotalQuantity = Number(totalQuantity) + +quantity;
            if (!checkLostProcessing(check_borrow_book) || newTotalQuantity > 2) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PLEASE_LOST_BOOK_PROCESSING,
                    },
                });
            }
            // Check count total
            if (check_borrow_book.length >= 2) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_CAN_ONLY_TOW_BORROW,
                    },
                });
            }
            // check student already borrow book
            const data_borrow_book = await borrow_book_model.getBorrowBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_DISABLE, user_id },
                '*',
            );
            // Condition  refund book
            const check_refund_book = data_borrow_book.length > 0 && data_borrow_book[0].status !== CONSTANTS.STATUS_BORROW.DONE && data_borrow_book[0].status === CONSTANTS.STATUS_BORROW.BORROWING;
            if (check_refund_book) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PLEASE_REFUND_BOOK,
                    },
                });
            }

            // Check data book exits
            const data_book = await book_model.getBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { quantity: 'quantity' },
            );

            if (!data_book.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                });
            }

            // Check quantity book
            const check_quantity_book = await book_service.handleCheckQuantityBook(data_book[0]);
            if (check_quantity_book) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.BOOK_OUT_OF_STOCK,
                    },
                });
            }

            // create book_borrowed database
            const data_insert = {
                borrowed_book_id: data_borrow_book.length > 0 ? data_borrow_book[0].borrowed_book_id : RANDOMS.createID(),
                book_id,
                user_id,
                quantity: data_borrow_book.length > 0 ? Number(data_borrow_book[0].quantity) + Number(quantity) : Number(quantity),
                status: CONSTANTS.STATUS_BORROW.PENDING,
            };

            // update quantity book database
            const data_update = {
                quantity: Number(data_book[0].quantity) - Number(quantity),
            };

            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                borrow_book_model.transactionBorrowBook(data_insert, data_update),
            );

            // Insert or update  success
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
                        result: MESSAGES.GENERAL.SUCCESS_BORROW_BOOK_ADMIN_SUCCESS,
                    },
                });
            }
            // Insert or update error
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (error) {
            console.error(error);
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
     * @created_at 08/02/2023
     * @description update BorrowBook
     * @function updateBorrowBook
     * @return {Object:{Number,String}}
     */
    updateBorrowBook: async (req, res) => {
        const { borrowed_book_id, book_id, start_date, due_date, status } = req.body.input.borrow_book_input;

        // Check input
        if (!HELPER.validateBigInt(borrowed_book_id) || !HELPER.validateBigInt(book_id) || !status) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        const data_update = {
            borrowed_book_id,
            start_date,
            due_date,
            status,
        };
        let data_book_borrow;
        try {
            // Check data book exits
            data_book_borrow = await borrow_book_model.getBorrowBookById(
                { borrowed_book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { status: 'status', book_id: 'book_id', quantity: 'quantity' },
            );

            if (!data_book_borrow.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_NOT_BOOK,
                    },
                });
            }

            if (data_book_borrow[0].status === status) {
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
            if (Number(status) === CONSTANTS.STATUS_BORROW.BORROWING || Number(status) === CONSTANTS.STATUS_BORROW.EXPIRED) {
                // update book database
                [err, result] = await HELPER.handleRequest(
                    borrow_book_model.updateBorrowBook(
                        data_update,
                        { borrowed_book_id },
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
            } else if (Number(status) === CONSTANTS.STATUS_BORROW.DONE || Number(status) === CONSTANTS.STATUS_BORROW.LOST_BOOK_PROCESSED) {
                // Check data book exits
                const data_book = await book_model.getBookById(
                    { book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                    { quantity: 'quantity' },
                );
                const data_update_book = {
                    book_id,
                    quantity: Number(data_book[0].quantity) + Number(data_book_borrow[0].quantity),
                };
                const data_update_borrow = {
                    book_id,
                    borrowed_book_id,
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
     * @created_at 09/03/2023
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
     * @created_at 09/03/2023
     * @description Detail Borrowed Book
     * @function borrowBook
     * @return {Object:{Number,String}
     */
    getDetailBorrowBook: async (req, res) => {
        const borrowed_book_id = req.params.borrowed_book_id;

        // Check input
        if (!HELPER.validateBigInt(borrowed_book_id)) {
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
            const result_borrow_book_detail = await borrow_book_model.getBorrowBook(borrowed_book_id, null);

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

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description Delete Borrowed processing Book
     * @function deleteBorrowBookProcessing
     * @return {Object:{Number,String}
     */
    deleteBorrowBookProcessing: async (req, res) => {
        const borrowed_book_id = req.body.input.borrowed_book_id;

        // Check input
        if (!HELPER.validateBigInt(borrowed_book_id)) {
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
            const result_borrow_book_detail = await borrow_book_model.getBorrowBookById(
                {
                    borrowed_book_id,
                    status: CONSTANTS.STATUS_BORROW.PENDING,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    borrowed_book_id: 'borrowed_book_id',
                    book_id: 'book_id',
                },
            );
            if (!result_borrow_book_detail || !result_borrow_book_detail.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PLEASE_DELETE_BORROW_BOOK_PENDING,
                    },
                });
            } else if (result_borrow_book_detail) {
                const book_id = result_borrow_book_detail[0].book_id;

                const data_book = await book_model.getBookById(
                    {
                        book_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    { quantity: 'quantity' },
                );
                const data_update_book = {
                    book_id,
                    quantity: data_book[0].quantity + 1,
                };
                const data_update_borrow = {
                    borrowed_book_id,
                    book_id,
                    status: CONSTANTS.STATUS_BORROW.CANCEL,
                };
                let err;
                let result;
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
                            result: MESSAGES.GENERAL.SUCCESS_DELETE_BORROW_BOOK,
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
     * @created_at 04/04/2023
     * @description update BorrowBook Lost
     * @function updateBorrowBook
     * @return {Object:{Number,String}}
     */
};
module.exports = BorrowBookController;
