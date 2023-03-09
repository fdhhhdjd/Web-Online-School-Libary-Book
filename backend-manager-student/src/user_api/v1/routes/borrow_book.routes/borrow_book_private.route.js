//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const borrowBookController = require('../../controllers/borrow_book.controllers/borrow_book.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @updateed_at 08/03/2023
 * @description Route borrow book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/borrow', borrowBookController.borrowBook);

module.exports = router;
