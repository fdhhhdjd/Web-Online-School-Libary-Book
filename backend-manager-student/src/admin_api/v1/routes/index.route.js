//! LIBRARY
const router = require('express').Router();

//! ROUTES
const adminRouter = require('./admin/admin.route');
const adminPrivateRouter = require('./admin/admin.private.route');

//! SHARE MIDDLEWARE
const accessAdminMiddleware = require('../../../share/middleware/access.admin.middleware');
const rate_limit_middleware = require('../../../share/middleware/rate_limit.middleware');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @update_at 11/01/2023 && 28/02/2023
 * @description Route Admins
 */
router.use('/api/v1/admin', rate_limit_middleware, adminRouter);

router.use('/api/v1/admin/private', rate_limit_middleware, accessAdminMiddleware, adminPrivateRouter);

router.get('/check-status', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'OK',
    });
});

module.exports = router;
