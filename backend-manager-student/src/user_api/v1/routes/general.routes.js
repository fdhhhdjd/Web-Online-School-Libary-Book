//! LIBRARY
const router_general = require('express').Router();

//! ROUTES
const userRouter = require('./users.routes/user.route');
const bookRouter = require('./books.routes/book.route');
const authorRouter = require('./author.routes/author.route');
const categoriesRouter = require('./categories.routes/categories.route');
const commentsRouter = require('./comment.routes/comment.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route Student
 */
router_general.use('/', userRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route Book
 */
router_general.use('/book', bookRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route author
 */
router_general.use('/author', authorRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route categories
 */
router_general.use('/categories', categoriesRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/04/2023
 * @description Route comment
 */
router_general.use('/comment', commentsRouter);

module.exports = router_general;
