//! Share
const CONSTANTS = require('../../../../share/configs/constants');
const { handleException } = require('../../../../share/utils/redis_pub_sub_helper');

//! Model
const borrow_book_model = require('../../../../share/models/book_borrowed.model');

//! SERVICE
const borrow_book_service = require('../../../../share/services/cron_service/borrow_book_service');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/04/2023
     * @description cron_change_status_borrow_book_student
     * @function cron_change_status_borrow_book_student
     */
    async cron_change_status_borrow_book_student() {
        try {
            // Get all table borrow book
            const borrowBookList = await borrow_book_model.getBorrowBook();

            // borrowBookList exit data
            if (borrowBookList.length > 0) {
                // Check if the created_at date is greater than 1 day
                borrowBookList.forEach(async (borrowBook) => {
                    // Take  time date now
                    const diffDays = borrow_book_service.handleChangeStatusBorrowBook(borrowBook);
                    // Check status equa peding
                    const status_pending = borrowBook.status === CONSTANTS.STATUS_BORROW.PENDING;
                    if (diffDays > 1 && status_pending) {
                        // Update Cancel book_borrowed database
                        const data_delete_borrow_book = {
                            borrowed_book_id: borrowBook.borrowed_book_id,
                            status: CONSTANTS.STATUS_BORROW.CANCEL,
                        };
                        // update quantity book database
                        const data_update_book = {
                            quantity: borrowBook.quantity + 1,
                            book_id: borrowBook.book_id,
                        };
                        // Start transaction
                        borrow_book_model.transactionDeleteBorrowAndUpdateBook(
                            data_delete_borrow_book,
                            data_update_book,
                        );
                    }
                });

                console.info('CRON CHANGE STATUS BORROW BOOK DONE !');
            } else {
                console.error('NO CHANGE STATUS BORROW BOOK!!!');
            }
        } catch (error) {
            console.error('UPDATE FAIL!', error);
            handleException(error, CONSTANTS.NAME_SERVER.CRON);
        }
    },
};
