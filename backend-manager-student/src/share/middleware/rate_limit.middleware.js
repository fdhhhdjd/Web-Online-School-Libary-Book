const rateLimit = require('express-rate-limit');
const CONFIGS = require('../configs/config');
const { returnReasons } = require('./handle_error');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/02/2023
 * @description Limit request
 * @function accessStudentMiddleware
 */

module.exports = rateLimit({
    windowMs: CONFIGS.IPA_API_RATE_LIMIT_DURATION * 1000, // in milliseconds
    max: CONFIGS.IPA_API_RATE_LIMIT,
    message: {
        status: 429,
        message: returnReasons('429'),
    },
    standardHeaders: true,
});
