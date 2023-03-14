//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const RANDOMS = require('../../../../share/utils/random');

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
     * @return {Object:{Number,String}
     */
    borrowBook: async (req, res) => {
        // Book input
        const { book_id } = req.body.input.borrow_book_input;

        // Take user Id
        const { id } = req.auth_user;

        if (!book_id || !id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // Check Student tow a borrow book
            const check_borrow_book = await borrowed_book_model.checkBorrowBook(
                { user_id: id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { book_id: 'book_id', status: 'status' },
            );
            if (check_borrow_book.length >= 2) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'You can only borrow tow book! ',
                    },
                });
            }
            // check student already borrow book
            const data_borrow_book = await borrowed_book_model.getBorrowBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_DISABLE, user_id: id },
                '*',
            );
            if (data_borrow_book.length > 0 && data_borrow_book[0].status !== CONSTANTS.STATUS_BORROW.DONE) {
                let result_borrow;
                switch (data_borrow_book[0].status) {
                case CONSTANTS.STATUS_BORROW.PENDING:
                    result_borrow = 'Book already borrow !!';
                    break;
                case CONSTANTS.STATUS_BORROW.BORROWING:
                    result_borrow = 'Please return the book !!';
                    break;
                default:
                    result_borrow = 'Fail';
                    break;
                }
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: result_borrow,
                    },
                });
            }

            // Check data book exits
            const data_book = await book_model.getBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { quantity: 'quantity' },
            );

            if (!data_book.length) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            // Check quantity book
            const check_quantity_book = await book_service.handleCheckQuantityBook(data_book[0]);
            if (check_quantity_book) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Book Out Of Stock',
                    },
                });
            }

            // create book_borrowed database
            const data_insert = {
                borrowed_book_id: RANDOMS.createID(),
                book_id,
                user_id: id,
                status: CONSTANTS.STATUS_BORROW.PENDING,
            };

            // update quantity book database
            const data_update = {
                quantity: data_book[0].quantity - 1,
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

                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: 'Invite you go to Library confirm,Thank',
                    },
                });
            }
            // Insert or update error
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
                    element: {
                        result: 'Borrow book Fail!',
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
