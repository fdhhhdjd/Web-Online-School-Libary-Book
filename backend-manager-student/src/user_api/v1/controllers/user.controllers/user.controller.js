//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const PASSWORD = require('../../../../share/utils/password');
const CONFIGS = require('../../../../share/configs/config');
const TOKENS = require('../../../../share/utils/token');
const MEMORY_CACHE = require('../../../../share/utils/limited_redis');
const REDIS_PUB_SUB = require('../../../../share/utils/redis_pub_sub_helper');
const RANDOMS = require('../../../../share/utils/random');
const MESSAGES = require('../../../../share/configs/message');

//! MODEL
const user_model = require('../../../../share/models/user.model');
const user_device_model = require('../../../../share/models/user_device.model');
const user_reset_password_model = require('../../../../share/models/user_reset_password.model');
const user_verification_model = require('../../../../share/models/user_verification.model');
const phone_model = require('../../../../share/models/phone.model');

//! SERVICE
const geo_service = require('../../../../share/services/geo.service');
const user_service = require('../../../../share/services/user_service/user_service');
const verification_service = require('../../../../share/services/user_service/verification.service');

//! MIDDLAWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

const userController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @updated_at 03/02/2023 && 04/02/2023 && 15/02/2023 && 22/02/2023 && 25/02/2023
     * @description Login student
     * @function LoginUser
     * @param { mssv,password }
     * @return { Object }
     */
    loginStudent: async (req, res) => {
        const { mssv, password } = req.body.input.user_login_input;

        // Take device id header
        let { device_id } = req.device;

        // Check input mssv password
        if (!mssv || !password || !HELPER.isNumeric(mssv)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Take ip computer student
            const ip = req.headers[CONSTANTS.HEADER_FORWARDED_FOR] || req.socket.remoteAddress || null;

            // Check student exit database
            let data_return = {
                user_id: 'user_id',
                role: 'role',
                name: 'name',
                email: 'email',
                password: 'password',
                public_id_avatar: 'public_id_avatar',
                phone_hidden: 'phone_hidden',
            };
            let data_query = {
                mssv,
                isdeleted: CONSTANTS.DELETED_DISABLE,
            };
            let users = await user_model.getStudentById(data_query, data_return);
            if (Array.isArray(users) && !users.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.STUDENT.NOT_EXIT_ACCOUNT,
                    },
                });
            }
            // Account database or redis
            let user = users[0];

            // Create key redis  key block login
            const key_block_login_student = HELPER.getURIFromTemplate(CONSTANTS.KEY_BLOCK_LOGIN_TIMES_STUDENT, {
                user_id: user.user_id,
            });

            // Take count number of customer in redis
            const student_count_login_api = await MEMORY_CACHE.getCache(key_block_login_student);
            // If count === 5 fail
            if (Number(student_count_login_api) >= CONSTANTS.LIMIT_LOGIN_BLOCK) {
                // Take time ttl key
                const time_ttl_cache = await MEMORY_CACHE.getExpirationTime(key_block_login_student);

                if (time_ttl_cache) {
                    return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                        element: {
                            result: MESSAGES.STUDENT.PAN_ACCOUNT_STUDENT,
                            time_full: time_ttl_cache,
                        },
                    });
                }
            }

            // Check password student
            const check_pass = await PASSWORD.comparePassword(password, user.password);

            if (!check_pass) {
                // Check exits key redis
                const check_key_exit = await MEMORY_CACHE.existsKeyCache(key_block_login_student);

                if (check_key_exit) {
                    // Increase number block Login
                    MEMORY_CACHE.increaseLoginWrongCache(key_block_login_student);
                } else {
                    // Save time login account wrong
                    MEMORY_CACHE.setAccountLoginWrongCache(key_block_login_student, CONSTANTS._1_DAY_S_REDIS);
                }

                return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_INCORRECT,
                        number_login: `${MESSAGES.STUDENT.WARNING_LOGIN} ${user_service.calculationBlock(
                            student_count_login_api,
                            CONSTANTS.LIMIT_LOGIN_BLOCK,
                        )}`,
                    },
                });
            }

            // Save Db device
            const geo = HELPER.findingLocationByIP(ip) || HELPER.findingLocationByIP(CONFIGS.IP_ADMIN);

            // Create public and private key
            const pub_pri_key = PASSWORD.randomPubPriKey();

            // Convert public key to pem
            const publicKeyString = PASSWORD.encodePemPubKey(pub_pri_key.publicKey);

            // Refresh_token new
            let refresh_token = TOKENS.createRefreshToken(
                {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                pub_pri_key.privateKey,
            );

            // Save Redis
            MEMORY_CACHE.setCacheEx(user.user_id, refresh_token, CONSTANTS._7_DAY_S_REDIS);

            // Create accept_token
            const access_token = TOKENS.createAcceptToken(
                {
                    id: user.user_id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                pub_pri_key.privateKey,
            );

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
                domain:
                    CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ?
                        req.headers[CONSTANTS.HEADER_HEADER_FORWARDED_HOST]?.split(':')[0]
                        : CONSTANTS.HEADER_DOMAIN,
                maxAge: CONSTANTS._1_MONTH,
            });

            // Time login student
            const login_time = new Date();

            // Info device
            const device_systems = HELPER.operatingSystem(req.headers[CONSTANTS.HEADER_DEVICE]);

            // Save Db device
            let data_device_insert = {
                device_uuid: device_id,
                ua_name: device_systems.browser.name,
                os_type: device_systems.os.name,
                user_id: user.user_id,
                last_access_time: login_time,
                login_ip: ip,
                public_key: publicKeyString,
                is_active: CONSTANTS.DELETED_ENABLE,
                login_location: geo_service.geoGPS(geo.range[0], geo.range[1]),
                refresh_token,
            };

            let err;
            let result;
            [err, result] = await HELPER.handleRequest(user_device_model.insertDevice(data_device_insert));

            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }

            if (result) {
                // Set key expire Block
                if (student_count_login_api) {
                    MEMORY_CACHE.expiresKeyCache(key_block_login_student, CONSTANTS._30_MINUTES_REDIS);
                }
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
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
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/02/2023
     * @update_at 14/02/2023 && 15/02/2023 && 25/02/2023
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
                // Take device id header
                const { device, session } = req;

                // Check black_list redis
                const token_black_list = await MEMORY_CACHE.getRangeCache(CONSTANTS.KEY_BACK_LIST, 0, 999999999);
                const token_black_set_old = new Set([...token_black_list]);

                const check_exits = token_black_set_old.has(refresh_token_cookie);

                // Check Token old
                const refetch_token_old = await user_device_model.getDeviceId(
                    { device_uuid: device.device_id },
                    {
                        refresh_token: 'refresh_token',
                        user_id: 'user_id',
                        last_login_time: 'last_login_time',
                        login_location: 'login_location',
                        os_type: 'os_type',
                        login_ip: 'login_ip',
                        ua_name: 'ua_name',
                        public_key: 'public_key',
                    },
                );

                // Check device null
                if (Array.isArray(refetch_token_old) && !refetch_token_old.length) {
                    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                        element: {
                            result: MESSAGES.GENERAL.NOTFOUND_DEVICE,
                        },
                    });
                }

                if (check_exits) {
                    // Check Token exit BlackList
                    const token_black_list_new = await MEMORY_CACHE.getRangeCache(
                        CONSTANTS.KEY_BACK_LIST,
                        0,
                        999999999,
                    );
                    const token_black_set_db = new Set([...token_black_list_new]);

                    // Check Token db
                    const check_exit_new = token_black_set_db.has(refetch_token_old[0].refresh_token);
                    if (!check_exit_new) {
                        // Save token old backlist
                        MEMORY_CACHE.setBlackListLoginExitTokenCache(
                            CONSTANTS.KEY_BACK_LIST,
                            refetch_token_old[0].user_id,
                            refetch_token_old[0].refresh_token,
                            CONSTANTS._20_DAY_S_REDIS,
                        );
                    }

                    // Get info account
                    let data_return = {
                        name: 'name',
                        email: 'email',
                    };
                    let data_query = {
                        user_id: refetch_token_old[0].user_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    };
                    let users = await user_model.getStudentById(data_query, data_return);

                    // Assign from object
                    refetch_token_old[0].name = users[0].name;
                    refetch_token_old[0].email = users[0].email;

                    // Remove cookie
                    res.clearCookie(CONFIGS.KEY_COOKIE);

                    // Remove Cookie
                    session.destroy();

                    // Publish data queue Redis
                    REDIS_PUB_SUB.sendEmailWithLock('user_send_email_warning_token', {
                        data_renew_token: refetch_token_old[0],
                    });

                    return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                        element: {
                            result: MESSAGES.GENERAL.INVALID_TOKEN,
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
                        const refresh_token_exit = refresh_token_cookie;

                        // Decode public key
                        const public_key_db = PASSWORD.decodePemPubKey(refetch_token_old[0].public_key);

                        // Check token expired
                        const decoded = HELPER.isRefreshTokenValid(refresh_token_exit, public_key_db);

                        let access_token;
                        let refresh_token;
                        if (decoded) {
                            // Create public and private key
                            const pub_pri_key = PASSWORD.randomPubPriKey();

                            // Convert public key to pem
                            const publicKeyString = PASSWORD.encodePemPubKey(pub_pri_key.publicKey);

                            // Create accept_token
                            access_token = TOKENS.createAcceptToken(
                                {
                                    id: result[0].user_id,
                                    name: result[0].name,
                                    email: result[0].email,
                                    role: result[0].role,
                                },
                                pub_pri_key.privateKey,
                            );

                            // Refresh_token new
                            refresh_token = TOKENS.createRefreshToken(
                                {
                                    id: result[0].user_id,
                                    name: result[0].name,
                                    email: result[0].email,
                                    role: result[0].role,
                                },
                                pub_pri_key.privateKey,
                            );

                            // Save Redis and Save RT old Blacklist
                            MEMORY_CACHE.setAndDelKeyBlackListCache(
                                result[0].user_id,
                                CONSTANTS.KEY_BACK_LIST,
                                refresh_token,
                                refresh_token_cookie,
                                CONSTANTS._7_DAY_S_REDIS,
                                CONSTANTS._20_DAY_S_REDIS,
                            );
                            // Clear Cookie
                            res.clearCookie(CONFIGS.KEY_COOKIE);

                            // Save cookie
                            res.cookie(CONFIGS.KEY_COOKIE, refresh_token, {
                                httpOnly: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                sameSite: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                secure: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                domain:
                                    CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ?
                                        req.headers[CONSTANTS.HEADER_HEADER_FORWARDED_HOST]?.split(':')[0]
                                        : CONSTANTS.HEADER_DOMAIN,
                                maxAge: CONSTANTS._1_MONTH,
                            });

                            // Time create token
                            const access_time = new Date();
                            let data_device_update = {
                                last_access_time: access_time,
                                refresh_token,
                                public_key: publicKeyString,
                            };

                            // Update Device
                            user_device_model.updateDevice(data_device_update, result[0].user_id);

                            return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                                status: CONSTANTS.HTTP.STATUS_2XX_OK,
                                message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
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
                        } else {
                            // Remove cookie
                            res.clearCookie(CONFIGS.KEY_COOKIE);

                            // Remove Cookie
                            session.destroy();

                            return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                                status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                                element: {
                                    result: MESSAGES.GENERAL.REFETCH_TOKEN_EXPIRE,
                                },
                            });
                        }
                    }

                    // Call Data Fail
                    if (err) {
                        return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                            status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                            message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                        });
                    }

                    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                        element: {
                            result: MESSAGES.GENERAL.TOKEN_EXPIRE,
                        },
                    });
                }
            } else {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.INVALID_HEADER,
                    },
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

                        return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                            status: CONSTANTS.HTTP.STATUS_2XX_OK,
                            message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                        });
                    }
                })
                .catch((err) => {
                    if (err) {
                        return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                            status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                            message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                        });
                    }
                });
        } catch (err) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
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
        // Take user Id
        const user_id = req.auth_user.id;

        // Check user_id
        if (!user_id) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        try {
            // Check student exit database
            let data_return = {
                user_id: 'user.user_id',
                role: 'user.role',
                mssv: 'user.mssv',
                name: 'user.name',
                avatar_uri: 'user.avatar_uri',
                email: 'user.email',
                address: 'user.address',
                dob: 'user.dob',
                gender: 'user.gender',
                class: 'user.class',
                phone_hidden: 'user.phone_hidden',
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
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: JSON.parse(user_cache),
                    },
                });
            }

            // Take data database
            let users = await user_model.getStudentJoinPhoneById(data_query, data_return);

            // Check account exits
            const user = users[0];
            if (!user || user.length === 0) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.STUDENT.NOT_EXIT_ACCOUNT,
                    },
                });
            }

            // Random time expire key difference
            const time_cache = HELPER.addTimeRandomNumber(CONSTANTS._7_DAY_S_REDIS, 1000);

            // Save Cache
            MEMORY_CACHE.setCacheEx(key_profile_student, JSON.stringify(user), time_cache);

            return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                status: CONSTANTS.HTTP.STATUS_2XX_OK,
                message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                element: {
                    result: user,
                },
            });
        } catch (err) {
            console.error(err);
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
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
        const { password, oldPassword, confirmPassword } = req.body.input.user_change_password_input;

        // Take user Id
        const user_id = req.auth_user.id;

        // Check user_id
        if (!user_id || !password || !oldPassword || !confirmPassword) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Take data database
            const new_user = await user_model.getStudentById(
                {
                    user_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                { password: 'password' },
            );

            const user = new_user[0];

            // Check Password true or false
            const isMatch = await PASSWORD.comparePassword(oldPassword, user.password);
            if (!isMatch) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_INCORRECT,
                    },
                });
            }

            // Password difference confirmPassword
            if (password !== confirmPassword) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_CONFIRM_INCORRECT,
                    },
                });
            }
            // Check Password Security
            const password_security = PASSWORD.isPassword(password);
            if (!password_security) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_NOT_BAD,
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
                // Save Blacklist
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
                );
                // Remove cookie
                res.clearCookie(CONFIGS.KEY_COOKIE);

                // Remove Cookie
                session.destroy();

                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: MESSAGES.GENERAL.EXPIRED_SESSION_TOKEN,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (err) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
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
        const { password } = req.body.input.user_check_password_input;

        // Take user Id
        const user_id = req.auth_user.id;

        // Check user_id
        if (!user_id || !password) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Create key redis  key block login
            const key_block_check_password_student = HELPER.getURIFromTemplate(
                CONSTANTS.KEY_BLOCK_CHECK_PASSWORD_TIMES_STUDENT,
                {
                    user_id,
                },
            );

            // Take count number of customer in redis
            const student_count_login_api = await MEMORY_CACHE.getCache(key_block_check_password_student);

            // If count === 4 fail
            if (Number(student_count_login_api) >= CONSTANTS.LIMIT_CHECK_PASSWORD_BLOCK) {
                // Take time ttl key
                const time_ttl_cache = await MEMORY_CACHE.getExpirationTime(key_block_check_password_student);

                if (time_ttl_cache) {
                    return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                        element: {
                            result: MESSAGES.STUDENT.PAN_ACCOUNT_STUDENT,
                            time_full: time_ttl_cache,
                        },
                    });
                }
            }

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
            const user = new_user[0];

            // Check Password true or false
            const isMatch = await PASSWORD.comparePassword(password, user.password);

            // Check exits key redis
            const check_key_exit = await MEMORY_CACHE.existsKeyCache(key_block_check_password_student);
            if (!isMatch) {
                if (check_key_exit) {
                    // Increase number block Login
                    MEMORY_CACHE.increaseLoginWrongCache(key_block_check_password_student);
                } else {
                    // Save time login account wrong
                    MEMORY_CACHE.setAccountLoginWrongCache(
                        key_block_check_password_student,
                        CONSTANTS._30_MINUTES_REDIS,
                    );
                }
                return res.status(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_UNAUTHORIZED),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_INCORRECT,
                        number_login: `${MESSAGES.STUDENT.WARNING_PASSWORD} ${user_service.calculationBlock(
                            student_count_login_api,
                            CONSTANTS.LIMIT_CHECK_PASSWORD_BLOCK,
                        )}`,
                    },
                });
            }
            if (check_key_exit) {
                MEMORY_CACHE.delKeyCache(key_block_check_password_student);
            }
            return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                status: CONSTANTS.HTTP.STATUS_2XX_OK,
                message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
            });
        } catch (err) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 13/02/2023
     * @description Forget password student
     * @function forgetPasswordStudent
     * @param { password }
     * @return { Object }
     */
    forgetPasswordStudent: async (req, res) => {
        const { email } = req.body.input.user_forget_password_input;

        // Check input
        if (!email) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        try {
            // Take data database
            let users = await user_model.getStudentById(
                { email, isdeleted: CONSTANTS.DELETED_DISABLE },
                { user_id: 'user_id', name: 'name', role: 'role' },
            );

            // Check account exits
            if (Array.isArray(users) && !users.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.STUDENT.NOT_EXIT_ACCOUNT,
                    },
                });
            }

            // Link url reset
            const key_reset_random = PASSWORD.resetStringToken();

            // Link expired
            const time_expire_reset = Date.now() + CONSTANTS._15_MINUTES;

            // Save Db device
            let data_device_insert = {
                id: RANDOMS.createID(),
                user_id: users[0].user_id,
                reset_password_token: key_reset_random,
                reset_password_expire: time_expire_reset,
            };

            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                user_reset_password_model.insertResetPassword(data_device_insert),
            );

            if (result) {
                // Create key redis  key block login
                const key_block_login_student = HELPER.getURIFromTemplate(CONSTANTS.LINK_RESET_STRING, {
                    port_reset: CONFIGS.PORT_FRONTEND_LOCAL,
                    key_reset_random,
                });
                // const resetPasswordUrl = ;
                // Publish data queue Redis
                REDIS_PUB_SUB.sendEmailWithLock('user_link_reset_password', {
                    data_reset: {
                        link_reset: key_block_login_student,
                        email,
                        name: users[0].name,
                    },
                });
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                });
            }
            if (err) {
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
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/02/2023
     * @description reset password student
     * @function resetPasswordStudent
     * @param { password }
     * @return { Object }
     */
    resetPasswordStudent: async (req, res) => {
        const { password, confirmPassword } = req.body.input.user_reset_password_input;

        // Take Param Routes
        const token_reset = req.params.token_reset;

        // Check input
        if (!password || !confirmPassword || !token_reset) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Take time toke_reset
            const data_reset = await user_reset_password_model.getResetPasswordById(
                { reset_password_token: token_reset },
                { reset_password_expire: 'reset_password_expire', user_id: 'user_id', isdeleted: 'isdeleted' },
            );

            // Check reset_password exits
            if (Array.isArray(data_reset) && !data_reset.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.LINK_RESET_NOT_FOUND,
                    },
                });
            }

            // Check Link Already change password
            if (data_reset[0].isdeleted === CONSTANTS.DELETED_ENABLE) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_BEEN_RESET,
                    },
                });
            }

            // Take database
            const check_token_reset = HELPER.isExpired(data_reset[0].reset_password_expire);

            // Check token_reset
            if (check_token_reset) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.LINK_RESET_EXPIRED,
                    },
                });
            }

            if (password !== confirmPassword) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_CONFIRM_INCORRECT,
                    },
                });
            }

            // Check Password Security
            const password_security = PASSWORD.isPassword(password);
            if (!password_security) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PASSWORD_NOT_BAD,
                    },
                });
            }

            // Encode Password student
            const new_password_student = await PASSWORD.encodePassword(password);

            // Save Database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                user_model.updateStudent(
                    { password: new_password_student },
                    {
                        user_id: data_reset[0].user_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    { user_id: 'user_id' },
                ),
            );

            if (result) {
                // Data update database
                await user_reset_password_model.updateResetPassword(
                    { isdeleted: CONSTANTS.DELETED_ENABLE },
                    {
                        user_id: data_reset[0].user_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    { user_id: 'user_id' },
                );

                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    element: {
                        result: MESSAGES.GENERAL.RESET_PASSWORD_FAIL,
                    },
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
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 25/02/2023
     * @updated_at 27/02/2023
     * @description Check email
     * @function checkEmailStudent
     * @param { password }
     * @return { Object }
     */
    checkEmailStudent: async (req, res) => {
        // Take user Id
        const { id, name, email } = req.auth_user;

        // Check user_id
        if (!id || !name || !email) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Get data verification student already check email
            const check_email_verification_student_success = await user_verification_model.getStudentVerificationById(
                {
                    user_id: id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                    verified: CONSTANTS.DELETED_ENABLE,
                    check_login: CONSTANTS.DELETED_ENABLE,
                },
                { verified: 'verified', verify_id: 'verify_id', link_email_expire: 'link_email_expire' },
            );

            if (check_email_verification_student_success.length > 0) {
                // Save Phone DB or check phone DB
                const check_phone_student = await phone_model.getPhoneById(
                    { user_id: id, isdeleted: CONSTANTS.DELETED_DISABLE },
                    { phone_id: 'phone_id' },
                );
                if (check_phone_student.length === 0) {
                    // Take  data user phone
                    const phone_student = await user_model.getStudentById(
                        { user_id: id, isdeleted: CONSTANTS.DELETED_DISABLE },
                        { phone_number: 'phone_number' },
                    );
                    // Check exits phone
                    if (phone_student.length > 0) {
                        // Data return network api
                        const take_data_phone = await HELPER.getDataPhone(phone_student[0].phone_number);

                        // Check phone true save phone DB
                        if (take_data_phone) {
                            const random_general = RANDOMS.createID();
                            // Data insert Phone
                            const data_insert_phone = {
                                phone_id: random_general,
                                user_id: id,
                                mobile_country_code: take_data_phone?.carrier.mobile_country_code,
                                mobile_network_code: take_data_phone?.carrier.mobile_network_code,
                                mobile_network_name: take_data_phone?.carrier.name,
                            };

                            // Insert phone
                            phone_model.createPhone(data_insert_phone);

                            // Update phone_id student
                            user_model.updateStudent(
                                { phone_id: random_general },
                                { user_id: id },
                                { user_id: 'user_id' },
                            );
                        }
                    }
                }
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                });
            }

            // Get data verification student
            const check_email_verification_student = await user_verification_model.getStudentVerificationById(
                { user_id: id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { verified: 'verified', verify_id: 'verify_id', link_email_expire: 'link_email_expire' },
            );

            // Variable setup Link
            const protocol_verification = req.protocol;
            const host_verification = req.get(CONSTANTS.HOST_PRODUCT);

            // Check Data verification
            if (Array.isArray(check_email_verification_student) && !check_email_verification_student.length) {
                // Send Email verification
                await verification_service.handleSendEmailVerification(
                    protocol_verification,
                    host_verification,
                    id,
                    name,
                    email,
                );
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.PLEASE_CHECK_EMAIL,
                    },
                });
            }

            // Take arr new in table verification
            const new_verification = check_email_verification_student[check_email_verification_student.length - 1];

            // Check expired verification
            const time_expire_verification = HELPER.isExpired(new_verification.link_email_expire);

            if (time_expire_verification !== CONSTANTS.DELETED_DISABLE) {
                // delete verification expire
                await user_verification_model.updateVerification(
                    { isdeleted: CONSTANTS.DELETED_ENABLE },
                    { verify_id: new_verification.verify_id },
                    { verify_id: 'verify_id' },
                );

                // Send Email verification
                await verification_service.handleSendEmailVerification(
                    protocol_verification,
                    host_verification,
                    id,
                    name,
                    email,
                );

                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: MESSAGES.GENERAL.PLEASE_CHECK_EMAIL,
                    },
                });
            } else {
                // Verification expire exit not send Email
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.ALREADY_EMAIL_CHECK_LINK,
                    },
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
    },

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 27/02/2023
     * @description send Link Verification email
     * @function sendEmailVerification
     * @return { Object }
     */
    sendEmailVerification: async (req, res) => {
        // Take user Id
        const { id, name, email } = req.auth_user;

        // Check user_id
        if (!id || !name || !email) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        try {
            // Get data verification student already check email
            const check_email_verification_student_success = await user_verification_model.getStudentVerificationById(
                {
                    user_id: id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                    verified: CONSTANTS.DELETED_ENABLE,
                    check_login: CONSTANTS.DELETED_ENABLE,
                },
                { verified: 'verified', verify_id: 'verify_id', link_email_expire: 'link_email_expire' },
            );

            // Check Link already check verify
            if (check_email_verification_student_success.length > 0) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.ALREADY_EMAIL_CHECK_LINK,
                    },
                });
            }

            // Get data verification student
            const check_email_verification_student = await user_verification_model.getStudentVerificationById(
                { user_id: id, isdeleted: CONSTANTS.DELETED_DISABLE },
                { verified: 'verified', verify_id: 'verify_id', link_email_expire: 'link_email_expire' },
            );

            // Variable setup Link
            const protocol_verification = req.protocol;
            const host_verification = req.get(CONSTANTS.HOST_PRODUCT);

            // Check Data verification
            if (Array.isArray(check_email_verification_student) && !check_email_verification_student.length) {
                // Send Email verification
                await verification_service.handleSendEmailVerification(
                    protocol_verification,
                    host_verification,
                    id,
                    name,
                    email,
                );
            } else {
                // Take arr new in table verification
                const new_verification = check_email_verification_student[check_email_verification_student.length - 1];

                // delete verification expire
                await user_verification_model.updateVerification(
                    { isdeleted: CONSTANTS.DELETED_ENABLE },
                    { verify_id: new_verification.verify_id },
                    { verify_id: 'verify_id' },
                );

                // Send Email verification
                await verification_service.handleSendEmailVerification(
                    protocol_verification,
                    host_verification,
                    id,
                    name,
                    email,
                );
            }

            return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                status: CONSTANTS.HTTP.STATUS_2XX_OK,
                message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                element: {
                    result: MESSAGES.GENERAL.PLEASE_CHECK_EMAIL,
                },
            });
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 27/02/2023
     * @description Update Link Verification email
     * @function sendEmailVerification
     * @return { Object }
     */
    updateVerificationEmailStudent: async (req, res) => {
        const user_id = req.params.user_id;
        const uniqueString = req.params.uniqueString;

        // Get data verification student already check email
        const check_email_verification_student_success = await user_verification_model.getStudentVerificationById(
            {
                user_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
                verified: CONSTANTS.DELETED_ENABLE,
                check_login: CONSTANTS.DELETED_ENABLE,
            },
            { verified: 'verified', verify_id: 'verify_id', link_email_expire: 'link_email_expire' },
        );

        // Check Link already check verify
        if (check_email_verification_student_success.length > 0) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.ALREADY_EMAIL_CHECK_LINK,
                },
            });
        }

        // Check input
        if (!user_id || !uniqueString) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        // Get data verification student
        const check_email_verification_student = await user_verification_model.getStudentVerificationById(
            { verify_id: uniqueString, isdeleted: CONSTANTS.DELETED_DISABLE },
            { verify_id: 'verify_id', user_id: 'user_id', link_email_expire: 'link_email_expire' },
        );

        // Take arr new in table verification
        const new_verification = check_email_verification_student[check_email_verification_student.length - 1];

        // Check expired verification
        const time_expire_verification = HELPER.isExpired(new_verification.link_email_expire);

        if (time_expire_verification !== CONSTANTS.DELETED_DISABLE) {
            // delete verification expire
            await user_verification_model.updateVerification(
                { isdeleted: CONSTANTS.DELETED_ENABLE },
                { verify_id: uniqueString },
                { verify_id: 'verify_id' },
            );

            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.LINK_RESET_EXPIRED,
                },
            });
        }

        // Update verification link
        await user_verification_model.updateVerification(
            { verified: CONSTANTS.DELETED_ENABLE, check_login: CONSTANTS.DELETED_ENABLE },
            { verify_id: uniqueString },
            { verify_id: 'verify_id' },
        );

        return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
            status: CONSTANTS.HTTP.STATUS_2XX_OK,
            message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
        });
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/03/2023
     * @description Update Profile Student
     * @function updateProfileStudent
     * @return { Object }
     */
    updateProfileStudent: async (req, res) => {
        // Take user Id
        const { id } = req.auth_user;

        // Input body
        const { name, avatar_uri, public_id_avatar, address, dob, gender } = req.body.input.user_update_profile_input;

        // Check user_id
        if (!id) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        // Check Input is empty
        if (
            (name !== undefined && name.trim() === '')
            || (avatar_uri !== undefined && avatar_uri.trim() === '')
            || (public_id_avatar !== undefined && public_id_avatar.trim() === '')
            || (address !== undefined && address.trim() === '')
            || (dob !== undefined && dob.trim() === '')
        ) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_MUTILP_FIELD,
                },
            });
        }

        const birthday = new Date(dob); // dob from student input
        const today = new Date(); // date now

        // Compare date  dob and date now
        if (birthday >= today) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_DATE,
                },
            });
        }

        try {
            // Data update
            const data_update = {
                name,
                avatar_uri,
                public_id_avatar,
                address,
                dob,
                gender,
            };

            // Save Database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                user_model.updateStudent(data_update, { user_id: id }, { user_id: 'user_id' }),
            );

            // Update student success
            if (result) {
                // Create key redis profile
                const key_profile_student = HELPER.getURIFromTemplate(CONSTANTS.KEY_PROFILE_STUDENT, {
                    user_id: id,
                });

                // Del key redis cache
                MEMORY_CACHE.delKeyCache(key_profile_student);

                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                });
            }

            // Update fail
            if (err) {
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
    },
};
module.exports = userController;
