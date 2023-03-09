//! Share
const CONSTANTS = require('../configs/constants');

//! Database
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/02/2023
     * @description Insert reset password student
     */
    insertResetPassword: (data) => new Promise((resolve, reject) => {
        try {
            const result = knex('reset_password')
                .insert(data)
                .onConflict('id')
                .merge()
                .returning(['id', 'user_id']);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/02/2023
     * @description Get reset_token info by ID
     */
    getResetPasswordById: async (student_query, return_data) => {
        const student = await knex('reset_password').select(return_data).where(student_query);
        return student;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/02/2023
     * @description Update reset Password
     */
    updateResetPassword: async (data, student_query, return_data) => new Promise((resolve, reject) => {
        try {
            const result = knex('reset_password').update(data).where(student_query).returning(return_data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/02/2023
     * @description List all reset password
     */
    getResetPasswordList: async () => new Promise((resolve, reject) => {
        knex('reset_password')
            .where('isdeleted', CONSTANTS.DELETED_DISABLE)
            .orderBy('created_at', 'asc')
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            });
    }),
};
