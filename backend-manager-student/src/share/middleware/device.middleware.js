const HELPER = require('../utils/helper');

module.exports = (req, res, next) => {
    const device = HELPER.getDeviceFromHeaders(req.headers);
    if (device) {
        req.device = device;
        return next();
    }
    return res.status(400).json({
        status: 400,
        message: 'Missing Device',
    });
};
