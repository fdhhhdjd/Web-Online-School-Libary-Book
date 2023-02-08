const HELPER = require('../utils/helper');
const TOKENS = require('../utils/token');
const CONSTANTS = require('../configs/constants');

const MEMORY_CACHE = require('../utils/limited_redis');

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

        const refresh_token_cookie = req.cookies.libary_school;

        // Check header authorization
        if (req.headers.authorization || refresh_token_cookie) {
            // Take token
            const accessToken = req.headers.authorization.split(' ')[1];

            // Take info from token
            let auth_user_decode = TOKENS.verifyAccessToken(accessToken);

            // Check time Expired token
            let check_access_token = HELPER.isAccessTokenValid(accessToken);
            if (check_access_token) {
                return res.status(401).json({
                    status: 401,
                    message: returnReasons('401'),
                    element: {
                        result: 'Expired Token',
                    },
                });
            }

            // Check BlackList
            try {
                const token_black_list = await MEMORY_CACHE.getRangeCache(CONSTANTS.KEY_BACK_LIST, 0, 999999999);

                // Check 2 token
                const check_exits_refresh_token = token_black_list.indexOf(refresh_token_cookie) > -1;
                const check_exits_access_token = token_black_list.indexOf(accessToken) > -1;

                if (check_exits_refresh_token || check_exits_access_token) {
                    return res.status(400).json({
                        status: 400,
                        message: returnReasons('400'),
                        element: {
                            result: 'Invalid Token',
                        },
                    });
                }

                // save request
                req.auth_user = auth_user_decode;
                req.access_token = accessToken;

                // Continue
                next();
            } catch (error) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
                });
            }
        } else {
            return res.status(401).json({
                status: 401,
                message: returnReasons('401'),
                element: {
                    result: 'Unauthorized',
                },
            });
        }
    } catch (error) {
        return res.status(503).json({
            status: 503,
            message: returnReasons('503'),
            element: {
                result: 'Out Of Service',
            },
        });
    }
};
module.exports = accessStudentMiddleware;
