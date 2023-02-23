const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/02/2023
     * @description Insert reset password student
     */
    insertResetPassword: (data) =>
        new Promise((resolve, reject) => {
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
};
