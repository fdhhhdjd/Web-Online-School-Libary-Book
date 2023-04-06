//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const RANDOMS = require('../../../../share/utils/random');
const MESSAGES = require('../../../../share/configs/message');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const book_model = require('../../../../share/models/book.model');
const borrowed_book_model = require('../../../../share/models/book_borrowed.model');

//! SERVICE
const book_service = require('../../../../share/services/user_service/book_service');
const book_admin_service = require('../../../../share/services/admin_service/book_service');

const BorrowBookController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 08/03/2022
     * @description Borrowed Book
     * @function borrowBook
     * @return {Object}
     */
    borrowBook: async (req, res) => {
        // Book input
        const { book_id, quantity } = req.body.input.borrow_book_input;

        // Take user Id
        const { id } = req.auth_user;
        if (!HELPER.validateBigInt(book_id) || !HELPER.validateBigInt(id) || !quantity) {
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
            const check_borrow_book = await borrowed_book_model.checkBorrowBook(
                { user_id: id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { book_id: 'book_id', status: 'status', user_id: 'user_id', quantity: 'quantity' },
            );
            // Check book lost processing
            const checkLostProcessing = (arr) =>
                !arr.some((obj) => obj.status === CONSTANTS.STATUS_BORROW.LOST_BOOK_PROCESSING);
            const totalQuantity = check_borrow_book.reduce((acc, cur) => {
                if (cur.user_id === id) {
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
            const data_borrow_book = await borrowed_book_model.getBorrowBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_DISABLE, user_id: id },
                '*',
            );
            const refund_book =
                data_borrow_book.length > 0
                && data_borrow_book[0].status !== CONSTANTS.STATUS_BORROW.DONE
                && data_borrow_book[0].status;
            if (refund_book) {
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
                borrowed_book_id:
                    data_borrow_book.length > 0 ? data_borrow_book[0].borrowed_book_id : RANDOMS.createID(),
                book_id,
                user_id: id,
                quantity:
                    data_borrow_book.length > 0
                        ? Number(data_borrow_book[0].quantity) + Number(quantity)
                        : Number(quantity),
                status: CONSTANTS.STATUS_BORROW.PENDING,
            };

            // update quantity book database
            const data_update = {
                quantity: Number(data_book[0].quantity) - Number(quantity),
            };

            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                borrowed_book_model.transactionBorrowBook(data_insert, data_update),
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
                        result: MESSAGES.GENERAL.SUCCESS_BORROW_BOOK_SUCCESS,
                    },
                });
            }
            // Insert or update error
            if (err) {
                console.error(err);
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
     * @created_at 24/03/2022
     * @description Get All Borrowed Book
     * @function borrowBook
     * @return {Object}
     */

    borrowBookAll: async (req, res) => {
        try {
            // Take user Id
            const { id } = req.auth_user;
            if (!id) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.INVALID_INPUT,
                    },
                });
            }

            // Take data db
            const result_borrow_book = await borrowed_book_model.getBorrowBook(null, id);

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
     * @created_at 24/03/2022
     * @description Detail Borrowed Book
     * @function borrowBook
     * @return {Object:{Number,String}
     */
    getDetailBorrowBook: async (req, res) => {
        // Take param
        const borrowed_book_id = req.params.borrowed_book_id;

        // Take user Id
        const { id } = req.auth_user;

        // Check input
        if (!id || !borrowed_book_id) {
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
            const result_borrow_book_detail = await borrowed_book_model.getBorrowBook(borrowed_book_id, id);

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
