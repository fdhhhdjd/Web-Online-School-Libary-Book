// const { globalCache } = require('../../../share/patterns/LRU_Strategy.patterns');
const { returnReasons } = require('../../../share/middleware/handle_error');
const { takeDataStudent } = require('../../../share/services/admin.service');
const HELPER = require('../../../share/utils/helper');
const PASSWORD = require('../../../share/utils/password');

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
     * @created_at 12/01/2023
     * @description add feature take excel
     * @function LoginAdmin
     * @return {Object}
     */
    AddStudent: async (req, res) => {
        try {
            const sheets = HELPER.getDataExcel();

            const result = takeDataStudent(sheets);

            return res.status(200).json({
                status: 200,
                message: returnReasons('200'),
                element: result,
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
