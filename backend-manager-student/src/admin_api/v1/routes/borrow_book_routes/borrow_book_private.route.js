//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const borrowBookController = require('../../controllers/borrow_book.controllers/borrow_book.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 08/03/2023
 * @description Route Update Borrow book sutdent
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update', borrowBookController.updateBorrowBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @description Route GET All borrow book
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', borrowBookController.getAllBorrowBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @description Route GET Detail borrow book
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:borrowed_book_id', borrowBookController.getDetailBorrowBook);
module.exports = router;
