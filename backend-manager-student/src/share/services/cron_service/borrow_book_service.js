//! SHARE
const CONSTANTS = require('../../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/03/2023
     * @description handle Change Status Borrow Book
     * @function handleChangeStatusBorrowBook
     */
    handleChangeStatusBorrowBook: (borrowBook) => {
        const createdAt = new Date(borrowBook.created_at);
        const now = new Date();
        const diffTime = Math.abs(now - createdAt);
        return Math.ceil(diffTime / CONSTANTS._1_DAY_S);
    },
};
