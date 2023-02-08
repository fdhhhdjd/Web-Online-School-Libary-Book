const axios = require('axios');
const CONSTANTS = require('../configs/constants');
const HELPERS = require('../../v1/utils/helper');
require('dotenv').config();

const URL_USER_API = CONSTANTS.URL_API_USER;

module.exports = {
    /**
     * @Author Nguyễn Tiến Tài
     * @Created_at 04/02/2023
     * @Description Call api Route login user
     */
    login_user_test: async (mssv, password) => {
        try {
            const res = await axios.post(
                `${URL_USER_API}/v1/user/login`,
                {
                    input: {
                        user_login_input: {
                            mssv: mssv,
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
    /**
     * @Author Nguyễn Tiến Tài
     * @Created_at 05/02/2023
     * @Description Call api Route renew token
     */
    new_token_user_test: async () => {
        try {
            const res = await axios.post(
                `${URL_USER_API}/v1/user/renew-token`,
                {
                    headers: HELPERS.headerAPi(),
                },
            );
            return res;
        } catch (error) {
            return error;
        }
    },
    /**
     * @Author Nguyễn Tiến Tài
     * @Created_at 08/02/2023
     * @Description Call api Route Profile
     */
    get_profile_user_test: async () => {
        try {
            const res = await axios.get(
                `${URL_USER_API}/v1/user/profile`,
                {
                    headers: HELPERS.headerAPi(),
                },
            );
            return res;
        } catch (error) {
            return error;
        }
    }
};
