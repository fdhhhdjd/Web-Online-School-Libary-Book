//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description create Rating
     */
    createRatings: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('book_rates').insert(data).onConflict('rate_id').merge().returning(['rate_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description get rating id
     */
    getRatingsById: async (student_query, return_data) => {
        const result = await knex('book_rates').select(return_data).where(student_query);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description Get all Rating
     */
    getAllRatings: async (student_query, return_data) => {
        const result = await knex('book_rates').select(return_data).where(student_query).orderBy('updated_at', 'desc');
        return result;
    },
};
