//! SHARE
const HELPER = require('../utils/helper');
const CONSTANTS = require('../configs/constants');
const MESSAGES = require('../configs/message');

//! MIDDLAWARE
const { returnReasons } = require('./handle_error');

module.exports = (req, res, next) => {
    const device = HELPER.getDeviceFromHeaders(req.headers);
    if (device) {
        req.device = device;
        return next();
    }
    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
        element: {
            result: MESSAGES.GENERAL.NOTFOUND_DEVICE,
        },
    });
};
