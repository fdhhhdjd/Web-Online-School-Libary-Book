//! SHARE
const HELPER = require('../utils/helper');

//! MIDDLAWARE
const { returnReasons } = require('./handle_error');

module.exports = (req, res, next) => {
    // Take header
    const device = HELPER.getDeviceFromHeaders(req.headers);

    // Check device
    if (device) {
        req.device = device;
        return next();
    }
    return res.status(400).json({
        status: 400,
        message: returnReasons('400'),
        element: {
            result: 'Missing Device'
        },
    });
};
