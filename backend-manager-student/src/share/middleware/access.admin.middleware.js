//! SHARE
const HELPER = require('../utils/helper');
const TOKENS = require('../utils/token');
const PASSWORD = require('../utils/password');
const CONSTANTS = require('../configs/constants');
const MESSAGES = require('../configs/message');

//! MODEL
const user_device_model = require('../models/user_device.model');

//! HANDLE ERROR
const { returnReasons } = require('./handle_error');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/02/2023
 * @description Check Middlawre admin
 * @function accessAdminMiddleware
 */
const accessAdminMiddleware = async (req, res, next) => {
    // Date Now
    let now = new Date();

    // Log request
    console.info('[Request Time]:', now.toLocaleTimeString(), req.baseUrl, req.body, req.query);

    // Refresh token cookie
    const refresh_token_cookie = req.cookies.libary_school_admin;

    // Take accessToken at headers
    const accessToken = req.headers.authorization.split(' ')[1];

    // Check Token
    if (!refresh_token_cookie || !accessToken) {
        return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
            status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
            message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
            element: {
                result: MESSAGES.GENERAL.INVALID_UNAUTHORIZED,
            },
        });
    }

    // Take device
    const { device_id } = req.device;

    try {
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
        let auth_user_decode = TOKENS.verifyAccessToken(accessToken, publicKey);

        // Check time Expired token
        let check_access_token = HELPER.isAccessTokenValid(accessToken, publicKey);

        if (!check_access_token) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                element: {
                    result: MESSAGES.GENERAL.TOKEN_EXPIRE,
                },
            });
        }

        // save request
        req.auth_user = auth_user_decode;

        // Continue
        return next();
    } catch (error) {
        return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
            status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
            message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
            element: {
                result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
            },
        });
    }
};
module.exports = accessAdminMiddleware;
