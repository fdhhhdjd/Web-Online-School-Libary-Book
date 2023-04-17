//! SHARE
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const RANDOMS = require('../../../../share/utils/random');
const PASSWORD = require('../../../../share/utils/password');

//! MIDDLEWARE
const { returnReasons, returnDuplicate } = require('../../../../share/middleware/handle_error');

//! UTILS
const MEMORY_CACHE = require('../../../../share/utils/limited_redis');

//! MODEL
const student_model = require('../../../../share/models/user.model');

//! SERVICE

const StudentController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/03/2023
     * @description create Student
     * @function createStudent
     * @return {Object}
     */
    createStudent: async (req, res) => {
        const { name, mssv, phone_number, dob, class_room, email, gender, role } = req.body.input.create_student_input;

        // Take admin Id
        const admin_id = req.auth_user.id;

        // Check input
        if (
            !name
            || !mssv
            || !phone_number
            || !dob
            || !class_room
            || !email
            || !gender
            || !role
            || !HELPER.validateBigInt(admin_id)
        ) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        try {
            const result_detail_role = await student_model.getAdminId(
                {
                    user_id: admin_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    role: 'role',
                },
            );
            if (!result_detail_role || !result_detail_role.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.ADMIN.NOT_EXIT_ACCOUNT,
                    },
                });
            }
            if (Number(result_detail_role[0]?.role === CONSTANTS.ROLE.ROLE_MANAGER)) {
                if (Number(role) !== CONSTANTS.ROLE.ROLE_STUDENT) {
                    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                        element: {
                            result: MESSAGES.GENERAL.INVALID_ROLE,
                        },
                    });
                }
            }

            const check_email = HELPER.validateEmail(email);

            const check_phone = HELPER.validatePhone(phone_number);

            if (!check_email || !check_phone) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.INVALID_EMAIL_PHONE,
                    },
                });
            }

            const phone_hide = HELPER.maskLastPhoneNumber(phone_number);
            const password = HELPER.handleRemoveHyphen(dob);

            const password_student = await PASSWORD.encodePassword(password);
            // create Category database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                student_model.createStudent({
                    user_id: RANDOMS.createID(),
                    name,
                    mssv,
                    phone_number,
                    password: password_student,
                    phone_hidden: phone_hide,
                    dob,
                    class: class_room,
                    email,
                    role,
                    gender,
                    avatar_uri:
                        gender === CONSTANTS.GENDER_MALE ? CONSTANTS.GENDER_IMAGE_MALE : CONSTANTS.GENDER_IMAGE_FEMALE,
                }),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].user_id,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    element: {
                        result: returnDuplicate(err),
                    },
                });
            }
        } catch (error) {
            console.error(error);
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
     * @created_at 24/03/2023
     * @description update Student
     * @function updateStudent
     * @return {Object}
     */
    updateStudent: async (req, res) => {
        // Input body
        const { student_id, name, avatar_uri, public_id_avatar, address, dob, gender, role } =
            req.body.input.update_student_input;

        // Take admin Id
        const admin_id = req.auth_user.id;

        // Check input
        if (!student_id || !HELPER.validateBigInt(student_id) || !HELPER.validateBigInt(admin_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        if (
            [name, avatar_uri, public_id_avatar, address, dob, gender, role].some(
                (field) => field !== undefined && field.trim() === '',
            )
        ) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_MUTILP_FIELD,
                },
            });
        }
        try {
            if (role) {
                const result_detail_role = await student_model.getAdminId(
                    {
                        user_id: admin_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    {
                        role: 'role',
                    },
                );
                if (!result_detail_role || !result_detail_role.length) {
                    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                        element: {
                            result: MESSAGES.ADMIN.NOT_EXIT_ACCOUNT,
                        },
                    });
                }
                if (Number(result_detail_role[0]?.role === CONSTANTS.ROLE.ROLE_MANAGER)) {
                    if (Number(role) !== CONSTANTS.ROLE.ROLE_STUDENT) {
                        return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                            status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                            message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                            element: {
                                result: MESSAGES.GENERAL.INVALID_ROLE,
                            },
                        });
                    }
                }
            }
            const data_update = {
                name,
                avatar_uri,
                public_id_avatar,
                address,
                dob,
                gender,
                role,
            };
            // Check data book exits
            const result_student = await student_model.getStudentById(
                {
                    user_id: student_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    user_id: 'user_id',
                },
            );

            if (!result_student || !result_student.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.STUDENT.NOT_EXIT_ACCOUNT,
                    },
                });
            }

            let err;
            let result;
            // Update student database
            [err, result] = await HELPER.handleRequest(
                student_model.updateStudent(
                    data_update,
                    { user_id: student_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                    { user_id: 'user_id' },
                ),
            );
            if (result) {
                // Create key redis profile
                const key_student_id = HELPER.getURIFromTemplate(CONSTANTS.KEY_PROFILE_STUDENT, {
                    user_id: student_id,
                });
                // Delete cache profile student
                MEMORY_CACHE.delKeyCache(key_student_id);

                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: MESSAGES.GENERAL.SUCCESS_UPDATE_STUDENT,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (error) {
            console.error(error);
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
     * @created_at 25/03/2023
     * @updated_at 14/03/2023
     * @description deleteStudent
     * @function deleteStudent
     * @return {Object}
     */
    deleteStudent: async (req, res) => {
        const { student_id } = req.body.input.student_id;

        // Take admin Id
        const admin_id = req.auth_user.id;

        // Check input
        if (!HELPER.validateBigInt(student_id) || !req.body || !HELPER.validateBigInt(admin_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            const result_detail_role = await student_model.getAdminId(
                {
                    user_id: admin_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    role: 'role',
                },
            );
            if (!result_detail_role || !result_detail_role.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.ADMIN.NOT_EXIT_ACCOUNT,
                    },
                });
            }
            // Check account already delete
            const result_student_detail = await student_model.getStudentById(
                {
                    user_id: student_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    user_id: 'user_id',
                    email: 'email',
                    name: 'name',
                    phone_number: 'phone_number',
                    mssv: 'mssv',
                    role: 'role',
                },
            );

            if (!result_student_detail.length || !result_student_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.STUDENT.NOT_EXIT_ACCOUNT,
                    },
                });
            }
            if (Number(result_detail_role[0]?.role === CONSTANTS.ROLE.ROLE_MANAGER)) {
                if (Number(result_student_detail[0]?.role) !== CONSTANTS.ROLE.ROLE_STUDENT) {
                    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                        element: {
                            result: MESSAGES.GENERAL.INVALID_ROLE,
                        },
                    });
                }
            }
            // Delete author database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                student_model.updateStudent(
                    {
                        email: HELPER.getDeleteString(result_student_detail[0]?.email),
                        name: HELPER.getDeleteString(result_student_detail[0]?.name),
                        phone_number: HELPER.getDeleteString(result_student_detail[0]?.phone_number),
                        mssv: HELPER.getDeleteString(result_student_detail[0]?.mssv),
                        isdeleted: CONSTANTS.DELETED_ENABLE,
                    },
                    {
                        user_id: student_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    {
                        user_id: 'user_id',
                    },
                ),
            );
            if (result) {
                // Create key redis  profile
                const key_student_id = HELPER.getURIFromTemplate(CONSTANTS.KEY_PROFILE_STUDENT, {
                    user_id: student_id,
                });
                // Delete cache profile student
                MEMORY_CACHE.delKeyCache(key_student_id);

                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].user_id,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    element: {
                        result: returnDuplicate(err),
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
     * @created_at 24/03/2023
     * @description Get All student
     * @function getAllStudent
     * @return {Object}
     */
    getAllStudent: async (req, res) => {
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
            // Take data db
            const result_student = await student_model.getAllStudentJoinPhone(
                { isdeleted: CONSTANTS.DELETED_DISABLE, role: CONSTANTS.ROLE.ROLE_STUDENT },
                data_return,
            );

            if (result_student) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_student,
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
     * @created_at 09/03/2023
     * @description Detail Borrowed Book
     * @function borrowBook
     * @return {Object:{Number,String}
     */
    getDetailStudent: async (req, res) => {
        const student_id = req.params.student_id;

        // Check input
        if (!student_id) {
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
                user_id: student_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
            };
            // Take data db
            const result_student_detail = await student_model.getStudentJoinPhoneById(data_query, data_return);

            if (result_student_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_student_detail,
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
};
module.exports = StudentController;
