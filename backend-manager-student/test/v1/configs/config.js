require('dotenv').config('../../.env');
module.exports = {
    /**
        * @author Nguyễn Tiến Tài
        * @created_at 17/12/2022
        * @description url admin api
    */
    URL_API_ADMIN: process.env.UNIT_TEST_API_ADMIN,
    /**
        * @author Nguyễn Tiến Tài
        * @created_at 04/02/2023
        * @description file excel
    */
    XLSX_SUCCESS: process.env.XLSX_SUCCESS,
    XLSX_FAIL_DATA_EXIT: process.env.XLSX_FAIL_DATA_EXIT,
    XLSX_FAIL_DATABSE: process.env.XLSX_FAIL_DATABSE
};
