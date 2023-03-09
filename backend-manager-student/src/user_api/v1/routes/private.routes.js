//! LIBRARY
const router_private = require('express').Router();

//! ROUTES
const userPrivateRouter = require('./users.routes/user.private.route');
const bookPrivateRouter = require('./books.routes/book.private.route');
const borrowBookPrivateRouter = require('./borrow_book.routes/borrow_book_private.route');
const authorPrivateRouter = require('./author.routes/author.private.route');
const categoriesPrivateRouter = require('./categories.routes/categories.private.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route Student
 */
router_private.use('/', userPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route Book
 */
router_private.use('/book', bookPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route author
 */
router_private.use('/author', authorPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route categories
 */
router_private.use('/categories', categoriesPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route categories
 */
router_private.use('/borrow_book', borrowBookPrivateRouter);

module.exports = router_private;
