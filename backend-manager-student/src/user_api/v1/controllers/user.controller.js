const HELPER = require('../../../share/utils/helper');
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
     * @description Login student
     * @function LoginUser
     * @param { mssv,password }
     * @return { Object }
     */
    loginStudent: async (req, res) => {
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
                return res.status(401).json({
                    status: 401,
                    message: returnReasons('401'),
                    element: {
                        result: 'Password Is Incorrect !',
                    },
                });
            }

            // Save Db device
            const geo = HELPER.findingLocationByIP(ip) || HELPER.findingLocationByIP(CONFIGS.IP_ADMIN);

            // Check Token Redis
            let refresh_token_redis = await MEMORY_CACHE.getCache(user.user_id);

            // Save Refresh_token
            let refresh_token;
            if (!refresh_token_redis) {
                // Refresh_token new
                refresh_token = TOKENS.createRefreshToken({ id: user.user_id });

                // Save Redis
                MEMORY_CACHE.setCacheEx(user.user_id, refresh_token, CONSTANTS._7_DAY_S_REDIS);
            } else {
                // Refresh_token will is token redis
                refresh_token = refresh_token_redis;
            }

            // Create accept_token
            const access_token = TOKENS.createAcceptToken({ id: user.user_id });

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
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/02/2023
     * @description New Token
     * @function reNewToken
     * @param { mssv,password }
     * @return { Object }
     */
    reNewToken: async (req, res) => {
        try {
            // Take cookie and device
            let refresh_token_cookie = req.cookies.libary_school;

            // Check exit token
            if (refresh_token_cookie) {
                // Decode
                const { device } = req;

                // Check black_list redis
                const token_black_list = await MEMORY_CACHE.getRangeCache(CONSTANTS.KEY_BACK_LIST, 0, 999999999);
                const check_exits = token_black_list.indexOf(refresh_token_cookie) > -1;
                if (check_exits) {
                    return res.status(400).json({
                        status: 400,
                        message: returnReasons('400'),
                        element: {
                            result: 'Invalid Token',
                        },
                    });
                }
                // Check device and cookie
                if (device && refresh_token_cookie) {
                    let err;
                    let result;
                    [err, result] = await HELPER.handleRequest(
                        user_device_model.checkUserByToken(refresh_token_cookie, device.device_id),
                    );
                    // Student exits
                    if (result) {
                        // Refresh_token cookie
                        const refresh_token_exit = refresh_token_cookie;

                        // Check token expired
                        const decoded = HELPER.isRefreshTokenValid(refresh_token_exit);
                        let access_token;
                        let refresh_token;
                        if (decoded) {
                            // Create accept_token
                            access_token = TOKENS.createAcceptToken({ id: result[0].user_id });
                            refresh_token = refresh_token_cookie;
                        } else {
                            // Create accept_token
                            access_token = TOKENS.createAcceptToken({ id: result[0].user_id });

                            // Refresh_token new
                            refresh_token = TOKENS.createRefreshToken({ id: result[0].user_id });

                            // Save Redis
                            MEMORY_CACHE.setCacheEx(result[0].user_id, refresh_token, CONSTANTS._7_DAY_S_REDIS);

                            // Save cookie
                            res.cookie(CONFIGS.KEY_COOKIE, refresh_token, {
                                httpOnly: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                sameSite: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                secure: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                domain: req.headers[CONSTANTS.HEADER_HEADER_FORWARDED_HOST]?.split(':')[0] || '',
                                maxAge: CONSTANTS._1_MONTH,
                            });
                            // Time create token
                            const access_time = new Date();
                            let data_device_update = {
                                last_access_time: access_time,
                                refresh_token,
                            };
                            // Update Device
                            await HELPER.handleRequest(
                                user_device_model.updateDevice(data_device_update, result[0].user_id),
                            );
                        }

                        return res.status(200).json({
                            status: 200,
                            message: returnReasons('200'),
                            element: {
                                result: {
                                    access_token,
                                    refresh_token,
                                    role: result[0].role,
                                    user_id: result[0].user_id,
                                    name: result[0].name,
                                },
                            },
                        });
                    }
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: returnReasons('500'),
                        });
                    }
                }
            } else {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Invalid Header',
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
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/02/2023
     * @description Logout student
     * @function logoutStudent
     * @param { token }
     * @return { Object }
     */
    logoutStudent: async (req, res) => {
        try {
            // Take accessToken header
            const { access_token, session, auth_user } = req;

            // Take refresh token cookie
            let refresh_token_cookie = req.cookies.libary_school;

            // Save blackList
            MEMORY_CACHE.setBlackListCache(
                CONSTANTS.KEY_BACK_LIST,
                auth_user.id,
                access_token,
                refresh_token_cookie,
                CONSTANTS._20_DAY_S_REDIS,
            )
                .then((result) => {
                    if (result) {
                        // Remove cookie
                        res.clearCookie(CONFIGS.KEY_COOKIE);

                        // Remove Cookie
                        session.destroy();

                        return res.status(200).json({
                            status: 200,
                            message: returnReasons('200'),
                        });
                    }
                })
                .catch((err) => {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: returnReasons('500'),
                        });
                    }
                });
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
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 06/02/2023
     * @description Profile student
     * @function getProfileStudent
     * @param { token }
     * @return { Object }
     */
    getProfileStudent: async (req, res) => {
        try {
            // Take user Id
            const user_id = req.auth_user.id;

            // Check user_id
            if (!user_id) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            // Check student exit database
            let data_return = {
                user_id: 'user_id',
                role: 'role',
                mssv: 'mssv',
                name: 'name',
                avatar_uri: 'avatar_uri',
                email: 'email',
                address: 'address',
                dob: 'dob',
                gender: 'gender',
                class: 'class',
                phone_hidden: 'phone_hidden',
            };
            let data_query = {
                user_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
            };
            // Create key redis  profile
            const key_profile_student = HELPER.getURIFromTemplate(CONSTANTS.KEY_PROFILE_STUDENT, {
                user_id,
            });

            // Take data cache
            let user_cache = await MEMORY_CACHE.getCache(key_profile_student);

            // If cache exit take cache else take database
            if (user_cache) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: JSON.parse(user_cache),
                    },
                });
            }

            // Take data database
            let users = await user_model.getStudentById(data_query, data_return);

            // Check account exits
            const user = users[0];
            if (!user || user.length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            // Random time expire key difference
            const time_cache = HELPER.addTimeRandomNumber(CONSTANTS._7_DAY_S_REDIS, 1000);

            // Save Cache
            MEMORY_CACHE.setCacheEx(key_profile_student, JSON.stringify(user), time_cache);

            return res.status(200).json({
                status: 200,
                message: returnReasons('200'),
                element: {
                    result: user,
                },
            });
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
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 13/02/2023
     * @description Change password student
     * @function changePasswordStudent
     * @param { password, oldPassword, confirmPassword }
     * @return { Object }
     */
    changePasswordStudent: async (req, res) => {
        try {
            const { password, oldPassword, confirmPassword } = req.body.input.user_change_password_input;

            // Take user Id
            const user_id = req.auth_user.id;

            // Check user_id
            if (!user_id || !password || !oldPassword || !confirmPassword) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            // Key redis  profile
            const key_profile_student = HELPER.getURIFromTemplate(CONSTANTS.KEY_PROFILE_STUDENT, {
                user_id,
            });

            // Get Profile student cache
            let user;
            const user_redis = await MEMORY_CACHE.getCache(key_profile_student);
            user = JSON.parse(user_redis);

            if (!user) {
                // Check student exit database
                const data_return = {
                    password: 'password',
                };
                const data_query = {
                    user_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                };
                // Take data database
                const new_user = await user_model.getStudentById(data_query, data_return);
                user = new_user[0];
            }

            // Check Password true or false
            const isMatch = await PASSWORD.comparePassword(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: 401,
                    message: returnReasons('401'),
                    element: {
                        result: 'Wrong Password!',
                    },
                });
            }

            // Password difference confirmPassword
            if (password !== confirmPassword) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Password and confirm password does not match!',
                    },
                });
            }
            // Check Password Security
            const password_security = PASSWORD.isPassword(password);
            if (!password_security) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Includes 6 characters, uppercase, lowercase and some and special characters.',
                    },
                });
            }

            // Encode Password student
            const new_password_student = await PASSWORD.encodePassword(password);

            // Data update database
            const data = {
                password: new_password_student,
            };
            const data_query = {
                user_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
            };
            const data_return = {
                user_id: 'user_id',
            };

            // Save Database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(user_model.updateStudent(data, data_query, data_return));
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('503'),
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
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 13/02/2023
     * @description Check password student
     * @function checkPasswordStudent
     * @param { password }
     * @return { Object }
     */
    checkPasswordStudent: async (req, res) => {
        try {
            const { password } = req.body.input.user_check_password_input;

            // Take user Id
            const user_id = req.auth_user.id;

            // Check user_id
            if (!user_id || !password) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            // Key redis  profile
            const key_profile_student = HELPER.getURIFromTemplate(CONSTANTS.KEY_PROFILE_STUDENT, {
                user_id,
            });

            // Get Profile student cache
            let user;
            const user_redis = await MEMORY_CACHE.getCache(key_profile_student);
            user = JSON.parse(user_redis);

            if (!user) {
                // Check student exit database
                const data_return = {
                    password: 'password',
                };
                const data_query = {
                    user_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                };
                // Take data database
                const new_user = await user_model.getStudentById(data_query, data_return);
                user = new_user[0];
            }

            // Check Password true or false
            const isMatch = await PASSWORD.comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: 401,
                    message: returnReasons('401'),
                    element: {
                        result: 'Wrong Password!',
                    },
                });
            }

            return res.status(200).json({
                status: 200,
                message: returnReasons('200'),
            });
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
