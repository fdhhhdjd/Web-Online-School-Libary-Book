//! DATABASE
const knex = require('../db/postgresql');

//! SHARE
const TABLES = require('../configs/tables');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description Get Device Id
     */
    getDeviceId: (student_query, return_data) => {
        try {
            const student = knex(TABLES.USER_DEVICE).select(return_data).where(student_query);
            return student;
        } catch (error) {
            return error;
        }
    },
};
