//! LIBRARY
const router = require('express').Router();

//! ROUTES
const router_private = require('./private.routes');
const router_general = require('./general.routes');

//! SHARE MIDDLEWARE
const accessAdminMiddleware = require('../../../share/middleware/access.admin.middleware');
const rate_limit_middleware = require('../../../share/middleware/rate_limit.middleware');
const device_middleware = require('../../../share/middleware/device.middleware');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @update_at 11/01/2023 && 28/02/2023
 * @description Route Admins
 */
router.use('/api/v1/admin', rate_limit_middleware, device_middleware, router_general);

router.use('/api/v1/admin/private', rate_limit_middleware, device_middleware, accessAdminMiddleware, router_private);

router.get('/check-status', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'OK',
    });
});

module.exports = router;
