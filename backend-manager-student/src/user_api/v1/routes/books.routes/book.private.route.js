//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const bookController = require('../../controllers/book.controllers/book.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route get detail book
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:author_id', bookController.getDetailBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route get all book
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', bookController.getAllBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route borrow book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/borrow', bookController.borrowBook);

module.exports = router;
