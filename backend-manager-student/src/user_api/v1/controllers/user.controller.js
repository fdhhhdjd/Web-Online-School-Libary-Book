const HELPER = require('../../../share/utils/helper');
const RANDOM = require('../../../share/utils/random');
const CONSTANTS = require('../../../share/configs/constants');
const PASSWORD = require('../../../share/utils/password');
const CONFIGS = require('../../../share/configs/config');
const TOKENS = require('../../../share/utils/token');
const MEMORY_CACHE = require('../../../share/utils/limited_redis');

//! Model
const user_model = require('../../../share/models/user.model');
const user_device_model = require('../../../share/models/user_device.model');
const geo_service = require('../../../share/services/geo.service');
const { returnReasons } = require('../../../share/middleware/handle_error');

const userController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @updated_at 03/02/2023 && 04/02/2023
     * @description Login user
     * @function LoginUser
     * @param { mssv,password }
     * @return { Object }
     */
    LoginStudent: async (req, res) => {
        const { mssv, password } = req.body.input.user_login_input;
        let { device } = req;

        try {
            // Take ip computer student
            const ip = req.headers[CONSTANTS.HEADER_FORWARDED_FOR] || req.socket.remoteAddress || null;

            // Check input mssv password
            if (!mssv || !password || !HELPER.isNumeric(mssv)) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            // Check student exit database
            let data_return = {
                user_id: 'user_id',
                role: 'role',
                name: 'name',
                password: 'password',
                public_id_avatar: 'public_id_avatar',
                phone_hidden: 'phone_hidden',
            };
            let data_query = {
                mssv,
                isdeleted: CONSTANTS.DELETED_DISABLE,
            };
            let users = await user_model.getStudentById(data_query, data_return);
            if (!users[0]) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Student Not Exist!',
                    },
                });
            }

            // Check password student
            let user = users[0];
            const check_pass = await PASSWORD.comparePassword(password, user.password);
            if (!check_pass) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Password Is Incorrect !',
                    },
                });
            }

            // Save Db device
            const geo = HELPER.findingLocationByIP(ip) || HELPER.findingLocationByIP(CONFIGS.IP_ADMIN);

            // Random character
            const random_character = RANDOM.randomString(50);

            // Check Token Redis
            let refresh_token_redis = await MEMORY_CACHE.getCache(user.user_id);

            // Save Refresh_token
            let refresh_token;
            if (!refresh_token_redis) {
                // Refresh_token new
                refresh_token = TOKENS.createRefreshToken({ id: random_character });

                // Save Redis
                MEMORY_CACHE.setCacheEx(user.user_id, refresh_token, CONSTANTS._7_DAY_S_REDIS);
            } else {
                // Refresh_token will is token redis
                refresh_token = refresh_token_redis;
            }

            // Create accept_token
            const access_token = TOKENS.createAcceptToken({ id: random_character });

            // Save session
            const save_session = req.session;
            save_session.student = {
                user_id: user.user_id,
                role: user.role,
                name: user.name,
                public_id_avatar: user.public_id_avatar,
                phone_hidden: user.phone_hidden,
            };
            save_session.save();

            // Save cookie
            res.cookie(CONFIGS.KEY_COOKIE, refresh_token, {
                httpOnly: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                sameSite: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                secure: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                domain: req.headers[CONSTANTS.HEADER_HEADER_FORWARDED_HOST]?.split(':')[0] || '',
                maxAge: CONSTANTS._1_MONTH,
            });

            // Time login student
            const login_time = new Date();

            // Info device
            const device_systems = HELPER.operatingSystem(req.headers[CONSTANTS.HEADER_DEVICE]);

            // Save Db device
            let data_device_insert = {
                device_uuid: device.device_id,
                ua_name: device_systems.browser.name,
                os_type: device_systems.os.name,
                user_id: user.user_id,
                last_access_time: login_time,
                login_ip: ip,
                is_active: CONSTANTS.DELETED_ENABLE,
                login_location: geo_service.geoGPS(geo.range[0], geo.range[1]),
                refresh_token,
            };

            let err;
            let result;
            [err, result] = await HELPER.handleRequest(user_device_model.insertDevice(data_device_insert));

            if (err) {
                console.error(err, '===== Database Fail=======');
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
                });
            }

            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: {
                            access_token,
                            refresh_token,
                            role: user.role,
                            user_id: user.user_id,
                        },
                    },
                });
            }
        } catch (err) {
            console.error(err, '===== Server Fail =====');
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
};
module.exports = userController;
