//! LIBRARY
const router_private = require('express').Router();

//! ROUTES
const userPrivateRouter = require('./users.routes/user.private.route');
const borrowBookPrivateRouter = require('./borrow_book.routes/borrow_book_private.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route Student
 */
router_private.use('/', userPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route categories
 */
router_private.use('/borrow_book', borrowBookPrivateRouter);

module.exports = router_private;
