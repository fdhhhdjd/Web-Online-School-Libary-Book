// const { globalCache } = require('../../../share/patterns/LRU_Strategy.patterns');
const { returnReasons } = require('../../../share/middleware/handle_error');
const { takeDataStudent } = require('../../../share/services/admin.service');
const HELPER = require('../../../share/utils/helper');
const PASSWORD = require('../../../share/utils/password');
const RANDOMS = require('../../../share/utils/random');
const CONSTANTS = require('../../../share/configs/constants');
const user_model = require('../../../share/models/user.model');
const knex = require('../../../share/db/postgresql');

const adminController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @update_at 11/01/2023,19/01/2023
     * @description Login admin,add cache demo
     * @function LoginAdmin
     * @return {Object:{Number,String}
     */
    LoginAdmin: async (req, res) => {
        const { phone, email, password } = req.body.input.admin_login_input;
        // globalCache.putCache(phone, password);
        try {
            const check_email = HELPER.validateEmail(email);

            const check_phone = HELPER.validatePhone(phone);

            const check_password = PASSWORD.isValidPassword(password);

            if (!check_email || !check_phone || !check_password) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }
            const phone_data = await HELPER.getDataPhone(phone);
            if (Object.is(phone_data, null)) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }
            const mask_phone = HELPER.maskFistPhoneNumber(phone);

            const { mobile_network_code } = phone_data.carrier;
            const mobile_network_country_code = phone_data.carrier.mobile_country_code;

            const mobile_network_name = HELPER.returnMobileNetWork(mobile_network_code);

            return res.status(200).json({
                status: 200,
                data: {
                    phone,
                    mask_phone,
                    mobile_network_code,
                    mobile_network_country_code,
                    mobile_network_name,
                    password,
                },
                message: returnReasons('200'),
                // element1: globalCache.getCache(phone),
            });
        } catch (err) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
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
                            student.gender.toLowerCase() === CONSTANTS.GENDER_MALE_STRING ?
                                CONSTANTS.GENDER_MALE
                                : CONSTANTS.GENDER_FEMALE,
                        avatar_uri:
                            student.gender.toLowerCase() === CONSTANTS.GENDER_MALE_STRING ?
                                CONSTANTS.GENDER_IMAGE_MALE
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
