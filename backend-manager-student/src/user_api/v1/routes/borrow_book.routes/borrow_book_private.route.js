//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const borrowBookController = require('../../controllers/borrow_book.controllers/borrow_book.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @updated_at 08/03/2023
 * @description Route borrow book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/borrow', borrowBookController.borrowBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/03/2023
 * @description Route borrow book get all
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', borrowBookController.borrowBookAll);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/03/2023
 * @description Route borrow book get detail
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:borrowed_book_id', borrowBookController.getDetailBorrowBook);

module.exports = router;
