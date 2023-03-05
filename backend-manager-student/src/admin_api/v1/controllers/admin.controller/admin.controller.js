//! SHARE
const HELPER = require('../../../../share/utils/helper');
const PASSWORD = require('../../../../share/utils/password');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');
const TOKENS = require('../../../../share/utils/token');
const CONFIGS = require('../../../../share/configs/config');

//! MIDDLEWARE
// const { globalCache } = require('../../../share/patterns/LRU_Strategy.patterns');
const { returnReasons } = require('../../../../share/middleware/handle_error');
const { takeDataStudent } = require('../../../../share/services/admin.service');

//! MODEL
const user_model = require('../../../../share/models/user.model');
const user_device_model = require('../../../../share/models/user_device.model');

//! DATABASE
const knex = require('../../../../share/db/postgresql');

//! Service
const geo_service = require('../../../../share/services/geo.service');

const adminController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @update_at 11/01/2023,19/01/2023,28/02/2023
     * @description Login admin,add cache demo
     * @function LoginAdmin
     * @return {Object:{Number,String}
     */
    LoginAdmin: async (req, res) => {
        const { mssv, password } = req.body.input.admin_login_input;

        // Take device id header
        let { device_id } = req.device;

        // Check input mssv password
        if (!mssv || !password || !HELPER.isNumeric(mssv)) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        // Take ip computer student
        const ip = req.headers[CONSTANTS.HEADER_FORWARDED_FOR] || req.socket.remoteAddress || null;

        try {
            // Check admin exit database
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
            let admins = await user_model.getAdminId(data_query, data_return);

            // CHECK DATA ARRAY
            if (Array.isArray(admins) && !admins.length) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Admin Not Exist!',
                    },
                });
            }

            // Account database
            let admin = admins[0];

            // Check password student
            const check_pass = await PASSWORD.comparePassword(password, admin.password);
            if (!check_pass) {
                return res.status(401).json({
                    status: 401,
                    message: returnReasons('401'),
                    element: {
                        result: 'Password Is Incorrect ! ',
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
            const refresh_token = TOKENS.createRefreshToken(
                { id: admin.user_id, name: admin.name, email: admin.email },
                pub_pri_key.privateKey,
            );

            // Create accept_token
            const access_token = TOKENS.createAcceptToken(
                { id: admin.user_id, name: admin.name, email: admin.email },
                pub_pri_key.privateKey,
            );

            // Save cookie
            res.cookie(CONFIGS.KEY_COOKIE_ADMIN, refresh_token, {
                httpOnly: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                sameSite: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                secure: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                domain:
                    CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT
                        ? req.headers[CONSTANTS.HEADER_HEADER_FORWARDED_HOST]?.split(':')[0]
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
                user_id: admin.user_id,
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
                            role: admin.role,
                            admin_id: admin.user_id,
                        },
                    },
                });
            }
        } catch (err) {
            console.error(err, '------Fail');
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/02/2023
     * @description New Token
     * @function reNewToken
     * @param { mssv,password }
     * @return { Object }
     */
    reNewToken: async (req, res) => {
        try {
            // Take cookie and device
            let refresh_token_cookie = req.cookies.libary_school_admin;

            // Check exit token
            if (refresh_token_cookie) {
                // Take device id header
                const { device, session } = req;

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

                // Check device and cookie
                if (device && refresh_token_cookie) {
                    let err;
                    let result;
                    [err, result] = await HELPER.handleRequest(
                        user_device_model.checkUserByToken(refresh_token_cookie, device.device_id),
                    );
                    // admin exits
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
                                },
                                pub_pri_key.privateKey,
                            );

                            // Refresh_token new
                            refresh_token = TOKENS.createRefreshToken(
                                {
                                    id: result[0].user_id,
                                    name: result[0].name,
                                    email: result[0].email,
                                },
                                pub_pri_key.privateKey,
                            );

                            // Save cookie
                            res.cookie(CONFIGS.KEY_COOKIE_ADMIN, refresh_token, {
                                httpOnly: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                sameSite: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                secure: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? true : false,
                                domain:
                                    CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT
                                        ? req.headers[CONSTANTS.HEADER_HEADER_FORWARDED_HOST]?.split(':')[0]
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
                            await HELPER.handleRequest(
                                user_device_model.updateDevice(data_device_update, result[0].user_id),
                            );
                            return res.status(200).json({
                                status: 200,
                                message: returnReasons('200'),
                                element: {
                                    result: {
                                        access_token,
                                        refresh_token,
                                        role: result[0].role,
                                        admin_id: result[0].user_id,
                                        name: result[0].name,
                                    },
                                },
                            });
                        } else {
                            // Remove cookie
                            res.clearCookie(CONFIGS.KEY_COOKIE_ADMIN);

                            // Remove Cookie
                            session.destroy();

                            return res.status(401).json({
                                status: 401,
                                message: returnReasons('401'),
                                element: {
                                    result: 'Refresh_token Expired !!!!',
                                },
                            });
                        }
                    }

                    // Call Data Fail
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: returnReasons('500'),
                        });
                    }

                    return res.status(400).json({
                        status: 400,
                        message: returnReasons('400'),
                        element: 'Token Fail !',
                    });
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
            console.error(error);
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
     * @created_at 28/02/2023
     * @description Logout admin
     * @function logoutAdmin
     * @param { token }
     * @return { Object }
     */
    logoutAdmin: async (req, res) => {
        try {
            // Remove cookie
            res.clearCookie(CONFIGS.KEY_COOKIE_ADMIN);

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
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023 -> 02/02/2023
     * @description add feature take excel
     * @function AddStudent
     * @return {Object}
     */
    AddStudent: async (req, res) => {
        try {
            const { url_document } = req.body.input.admin_add_student_input;
            // return data excel
            const sheets = await HELPER.getDataExcelCloud(url_document);

            // repeat excel return json
            const result = takeDataStudent(sheets);

            // Check Object undefined remove
            let filteredData = result.filter((x) => Object.values(x).every((val) => val !== undefined));

            // Check data and add array
            let upsert_student = [];
            for (const student of filteredData) {
                const check_email = HELPER.validateEmail(student.email);

                const check_phone = HELPER.validatePhone(student.phone);

                if (!check_email || !check_phone) {
                    return res.status(400).json({
                        status: 400,
                        message: returnReasons('400'),
                        element: {
                            result: 'Invalid email or phone number!',
                        },
                    });
                }
                const phone_hide = HELPER.maskLastPhoneNumber(student.phone);
                const password = HELPER.handleRemoveHyphen(student.dob);

                const password_student = await PASSWORD.encodePassword(password);
                let data_query = {
                    mssv: student.student_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                };
                let data_return = {
                    gender: 'gender',
                };
                const student_exits = await user_model.getStudentById(data_query, data_return);

                if (!student_exits.length) {
                    upsert_student.push({
                        user_id: RANDOMS.createID(),
                        name: student.full_name,
                        mssv: student.student_id,
                        password: password_student,
                        phone_number: student.phone,
                        phone_hidden: phone_hide,
                        dob: student.dob,
                        class: student.class,
                        email: student.email,
                        gender:
                            student.gender.toLowerCase() === CONSTANTS.GENDER_MALE_STRING
                                ? CONSTANTS.GENDER_MALE
                                : CONSTANTS.GENDER_FEMALE,
                        avatar_uri:
                            student.gender.toLowerCase() === CONSTANTS.GENDER_MALE_STRING
                                ? CONSTANTS.GENDER_IMAGE_MALE
                                : CONSTANTS.GENDER_IMAGE_FEMALE,
                    });
                }
            }
            const arr_length = upsert_student.length === 0;
            if (arr_length) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: 'Nothing changes to update',
                    },
                });
            }

            let err;
            let data;
            // start transaction
            const trx = await knex.transaction();

            // insert student object into database
            [err, data] = await HELPER.handleRequest(user_model.addUser(upsert_student));

            // error rollback data
            if (err) {
                trx.rollback();
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Email or Phone or Email or Mssv exits !',
                    },
                });
            }
            // commit transaction succcess
            trx.commit();
            return res.status(201).json({
                status: 201,
                message: returnReasons('201'),
                element: {
                    result: data,
                },
            });
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
            });
        }
    },
};
module.exports = adminController;
