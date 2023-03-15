//! SHARE
const HELPER = require('../utils/helper');
const TOKENS = require('../utils/token');
const PASSWORD = require('../utils/password');

//! DATABASE
const user_device_model = require('../models/user_device.model');

//! MIDDLAWARE
const { returnReasons } = require('./handle_error');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Check Middlawre
 * @function accessTokenMiddleware
 */
const accessTokenMiddleware = async (req, res, next) => {
    // Date Now
    let now = new Date();

    // Log request
    console.info('[Request Time]:', now.toLocaleTimeString(), req.baseUrl, req.body, req.query);

    // Take accessToken at headers
    const accessToken = req.headers.authorization.split(' ')[1];
    try {

        // Check header authorization
        if (!accessToken) {
            return res.status(401).json({
                status: 401,
                message: returnReasons('401'),
                element: {
                    result: 'Unauthorized',
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
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }

        // Convert pem
        const publicKey = PASSWORD.decodePemPubKey(data_device[0].public_key);

        // Take info from token
        let auth_general_decode = TOKENS.verifyAccessToken(accessToken, publicKey);

        // Check time Expired token
        let check_access_token = HELPER.isAccessTokenValid(accessToken, publicKey);
        if (!check_access_token) {
            return res.status(401).json({
                status: 401,
                message: returnReasons('401'),
                element: {
                    result: 'Expired Token',
                },
            });
        }


        req.auth_general = auth_general_decode;

        // Continue
        return next();

    } catch (error) {
        console.log(error)
        return res.status(503).json({
            status: 503,
            message: returnReasons('503'),
            element: {
                result: 'Out Of Service',
            },
        });
    }
};
module.exports = accessTokenMiddleware;
