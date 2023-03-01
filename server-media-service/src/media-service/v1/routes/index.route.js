//! LIBRARY
const router = require('express').Router();

//! ROUTES
const media_private_routes = require('../routes/media.private.route');

//! MIDDLEWARE
const accessTokenMiddleware = require('../../../share/middlewares/access.token.middleware')
const rateLimitMiddleware = require('../../../share/middlewares/ratelimit.middleware')

/**
 * @author Nguyễn Tiến Tài
 * @created_at 12/01/2022 
 * @updated_at 03/01/2022 
 * @description Route Media
 */

//! ROUTES PRIVATE
router.use('/api/v1/media/private', rateLimitMiddleware, accessTokenMiddleware, media_private_routes);


router.get('/check-status', (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'OK',
    });
});

module.exports = router;
