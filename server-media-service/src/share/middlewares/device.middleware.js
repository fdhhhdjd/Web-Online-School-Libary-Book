//! SHARE
const HELPER = require('../utils/helper');
const CONSTANTS = require('../configs/constants');
const MESSAGES = require('../configs/message');

//! MIDDLAWARE
const { returnReasons } = require('./handle_error');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @updated_at 23/03/2023
 * @description Check Device
 */
module.exports = (req, res, next) => {
    // Take header
    const device = HELPER.getDeviceFromHeaders(req.headers);

    // Check device
    if (device) {
        req.device = device;
        return next();
    }
    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
        element: {
            result: MESSAGES.MEDIA.NO_DEVICE_MISSING,
        },
    });
};
