const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname + './../../jest/.env') });

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 17/12/2022
     * @update_at 09/01/2023
     * @description Token admin
     */
    TOKEN_TEST: `${process.env.TOKEN}`,
    URL_API_ADMIN: `${process.env.URL_API_ADMIN}`,
    URL_API_USER: `${process.env.URL_API_USER}`,
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 14/02/2023
    * @description Password 
    */
    PASSWORD: `${process.env.PASSWORD}`,
    OLD_PASSWORD: `${process.env.OLD_PASSWORD}`,
    CONFIRM_PASSWORD: `${process.env.CONFIRM_PASSWORD}`,
};


