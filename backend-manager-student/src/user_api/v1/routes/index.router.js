//! LIBARY
const router = require('express').Router();

//! ROUTES
const router_private = require('./private.routes');
const router_general = require('./general.routes');

//! SHARE MIDDLEWARE
const accessStudentMiddleware = require('../../../share/middleware/access.student.middleware');
const rate_limit_middleware = require('../../../share/middleware/rate_limit.middleware');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @updated_at 07/03/2023
 * @description Route Users middleware
 */
router.use('/api/v1/user/private', rate_limit_middleware, accessStudentMiddleware, router_private);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 23/02/2023
 * @updated_at 07/03/2023
 * @description Route Users not middleware
 */
router.use('/api/v1/user', rate_limit_middleware, router_general);

router.get('/check-status', (req, res) => res.status(200).json({
    status: 'success',
    message: 'OK',
}),
);

module.exports = router;
