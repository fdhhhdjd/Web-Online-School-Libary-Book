//! SHARE
const HELPER = require('../utils/helper');
const TOKENS = require('../utils/token');
const PASSWORD = require('../utils/password');
const CONSTANTS = require('../configs/constants');
const MESSAGES = require('../configs/message');

//! DATABASE
const user_device_model = require('../models/user_device.model');

//! MIDDLAWARE
const { returnReasons } = require('./handle_error');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @updated_at 23/03/2023
 * @description Check Middlawre
 * @function accessTokenMiddleware
 */
const accessTokenMiddleware = async (req, res, next) => {
    // Date Now
    const now = new Date();

    // Log request
    console.info('[Request Time]:', now.toLocaleTimeString(), req.baseUrl, req.body, req.query);

    // Take accessToken at headers
    const accessToken = req.headers.authorization.split(' ')[1];
    try {
        // Check header authorization
        if (!accessToken) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                element: {
                    result: MESSAGES.MEDIA.NO_AUTHORIZATION,
                },
            });
        }

        // Take token
        const { device_id } = req.device;

        // Take data device student
        const data_device = await user_device_model.getDeviceId(
            { device_uuid: device_id },
            { public_key: 'public_key' },
        );

        // Check data null
        if (Array.isArray(data_device) && !data_device.length) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
            });
        }

        // Convert pem
        const publicKey = PASSWORD.decodePemPubKey(data_device[0].public_key);

        // Take info from token
        const auth_general_decode = TOKENS.verifyAccessToken(accessToken, publicKey);

        // Check time Expired token
        const check_access_token = HELPER.isAccessTokenValid(accessToken, publicKey);
        if (!check_access_token) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                element: {
                    result: MESSAGES.MEDIA.NO_EXPIRED_TOKEN,
                },
            });
        }

        req.auth_general = auth_general_decode;

        // Continue
        return next();
    } catch (error) {
        console.log(error);
        return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
            status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
            message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
            element: {
                result: MESSAGES.MEDIA.NO_SERVER_OUT_OF_SERVICE,
            },
        });
    }
};
module.exports = accessTokenMiddleware;
