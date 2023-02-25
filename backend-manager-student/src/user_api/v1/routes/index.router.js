//! LIBARY
const router = require('express').Router();

//! ROUTES
const userRouter = require('./users/user.route');
const userPrivateRouter = require('./users/user.private.route');

//! SHARE MIDDLEWARE
const accessStudentMiddleware = require('../../../share/middleware/access.student.middleware');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @update_at 11/01/2023
 * @description Route Users middleware
 */
router.use('/api/v1/user/private', accessStudentMiddleware, userPrivateRouter);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 23/02/2023
 * @description Route Users not middleware
 */
router.use('/api/v1/user', userRouter);

router.get('/check-status', (req, res) =>
    res.status(200).json({
        status: 'success',
        message: 'OK',
    }),
);

module.exports = router;
