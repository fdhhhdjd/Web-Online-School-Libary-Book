//! LIBRARY
const router_private = require('express').Router();

//! ROUTES
const userPrivateRouter = require('./users.routes/user.private.route');
const borrowBookPrivateRouter = require('./borrow_book.routes/borrow_book_private.route');
const ratingBookPrivateRouter = require('./rating.routes/rating.private.route');
const favoritePrivateRouter = require('./favorite.routes/favorite.private.route');
const commentPrivateRouter = require('./comment.routes/comment.private.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route Student
 */
router_private.use('/', userPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route borrow book
 */
router_private.use('/borrow_book', borrowBookPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/04/2023
 * @description Route Ratings
 */
router_private.use('/rating', ratingBookPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/04/2023
 * @description Route Favorites
 */
router_private.use('/favorite', favoritePrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/04/2023
 * @description Route Comment
 */
router_private.use('/comment', commentPrivateRouter);

module.exports = router_private;
