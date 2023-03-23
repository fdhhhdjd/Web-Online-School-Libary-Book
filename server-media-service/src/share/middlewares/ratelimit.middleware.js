//! LIBRARY
const rateLimit = require('express-rate-limit');

//! SHARE
const CONFIGS = require('../configs/config');
const { returnReasons } = require('./handle_error');
const CONSTANTS = require('../configs/constants');
/**
     * @author Nguyễn Tiến Tài
     * @created_at 28/12/2022
     * @updated_at 23/03/2022
     * @description Limit request
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
