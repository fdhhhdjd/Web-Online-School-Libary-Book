//! SHARE
const HELPER = require('../utils/helper');
const TOKENS = require('../utils/token');
const CONSTANTS = require('../configs/constants');
const PASSWORD = require('../utils/password');
const MESSAGES = require('../configs/message');

//! CACHE
const MEMORY_CACHE = require('../utils/limited_redis');

//! MODEL
const user_device_model = require('../models/user_device.model');

//! HANDLE ERROR
const { returnReasons } = require('./handle_error');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 05/02/2023
 * @description Check Middlawre
 * @function accessStudentMiddleware
 */
const accessStudentMiddleware = async (req, res, next) => {
    try {
        // Date Now
        let now = new Date();

        // Log request
        console.info('[Request Time]:', now.toLocaleTimeString(), req.baseUrl, req.body, req.query);

        // Take refresh Token from cookie
        const refresh_token_cookie = req.cookies.libary_school;

        // Take accessToken at headers
        const accessToken = req.headers.authorization.split(' ')[1];

        // Check header authorization
        if (!refresh_token_cookie || !accessToken) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                element: {
                    result: MESSAGES.GENERAL.INVALID_UNAUTHORIZED,
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
                element: {
                    result: MESSAGES.GENERAL.NOTFOUND_DEVICE,
                },
            });
        }

        // Convert pem
        const publicKey = PASSWORD.decodePemPubKey(data_device[0].public_key);

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

        // Take info from token
        let auth_user_decode = TOKENS.verifyAccessToken(accessToken, publicKey);

        // Check is Student
        if (auth_user_decode?.role !== 0) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                element: {
                    result: MESSAGES.STUDENT.ROLE_STUDENT,
                },
            });
        }

        // Check BlackList
        try {
            const token_black_list = await MEMORY_CACHE.getRangeCache(CONSTANTS.KEY_BACK_LIST, 0, 999999999);

            const token_black_set = new Set([...token_black_list]);

            // Check 2 token
            const check_exits_refresh_token = token_black_set.has(refresh_token_cookie);
            const check_exits_access_token = token_black_set.has(accessToken);

            if (check_exits_refresh_token || check_exits_access_token) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                    element: {
                        result: MESSAGES.GENERAL.INVALID_TOKEN,
                    },
                });
            }

            // save request
            req.auth_user = auth_user_decode;
            req.access_token = accessToken;

            // Continue
            next();
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
            });
        }
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
module.exports = accessStudentMiddleware;
