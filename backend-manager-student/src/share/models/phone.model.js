//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @Phone Nguyễn Tiến Tài
     * @created_at 09/03/2023
     * @description create Phone
     */
    createPhone: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('phone').insert(data).onConflict('phone_id').merge()
                    .returning(['phone_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @Phone Nguyễn Tiến Tài
     * @created_at 09/03/2023
     * @description get Phone id
     */
    getPhoneById: async (student_query, return_data) => {
        const result = await knex('phone').select(return_data).where(student_query);
        return result;
    },
    /**
     * @Phone Nguyễn Tiến Tài
     * @created_at 09/03/2023
     * @description Update Phone
     */
    updatePhone: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('phone').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
};
