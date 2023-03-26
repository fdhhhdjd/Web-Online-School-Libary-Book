//! LIBRARY
const rateLimit = require('express-rate-limit');

//! CONFIGS
const CONFIGS = require('../configs/config');
const CONSTANTS = require('../configs/constants');

//! ERROR
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
        status: CONSTANTS.HTTP.STATUS_4XX_TOO_MANY_REQUESTS,
        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_TOO_MANY_REQUESTS),
    },
    standardHeaders: CONSTANTS.DELETED_ENABLE,
});
