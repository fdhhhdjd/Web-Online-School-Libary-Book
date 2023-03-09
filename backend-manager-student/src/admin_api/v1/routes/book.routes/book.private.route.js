//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const bookController = require('../../controllers/book.controllers/book.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route create book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', bookController.createBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route update book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update', bookController.updateBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route delete book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', bookController.deleteBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get detail book
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/detail/:book_id', bookController.getDetailBook);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get all book
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/all', bookController.getAllBook);

module.exports = router;
