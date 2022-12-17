const helper = require('../utils/helper');

module.exports = (req, res, next) => {
    const device = helper.getDeviceFromHeaders(req.headers);
    if (device) {
        req.device = device;
        return next();
    }
    return res.status(400).json({
        status: 400,
        message: 'Missing Device',
    });
};
