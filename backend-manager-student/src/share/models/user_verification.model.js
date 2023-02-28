//! Share
const CONSTANTS = require('../configs/constants');

//! Database
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 25/02/2023
     * @description Insert reset verification student
     */
    insertVerificationEmail: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('verification')
                    .insert(data)
                    .onConflict('verify_id')
                    .merge()
                    .returning(['verify_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 25/02/2023
     * @description Get verification email student info by ID
     */
    getStudentVerificationById: async (student_query, return_data) => {
        const verification_student = await knex('verification').select(return_data).where(student_query);
        return verification_student;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 26/02/2023
     * @description Update verification
     */
    updateVerification: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('verification').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 26/02/2023
     * @description Update verification
     */
    getVerificationList: async () =>
        new Promise((resolve, reject) => {
            knex('verification')
                .where('isdeleted', CONSTANTS.DELETED_DISABLE)
                .where('verified', CONSTANTS.DELETED_DISABLE)
                .where('check_login', CONSTANTS.DELETED_DISABLE)
                .orderBy('created_at', 'asc')
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        }),
};
