const axios = require('axios');
const CONSTANTS = require('../configs/constants');
const HELPERS = require('../../v1/utils/helper');
require('dotenv').config();

const URL_ADMIN_API = CONSTANTS.URL_API_ADMIN;

module.exports = {
    /**
     * @Author Nguyễn Tiến Tài
     * @Created_at 17/12/2022
     * @Description Call api Route login admin
     */
    login_Admin_Test: async (user_name, password) => {
        try {
            const res = await axios.post(
                `${URL_ADMIN_API}/login`,
                {
                    input: {
                        admin_login_input: {
                            user_name: user_name,
                            password: password,
                        },
                    },
                },
                {
                    headers: HELPERS.headerAPi(),
                },
            );
            return res;
        } catch (error) {
            return error;
        }
    },
};
