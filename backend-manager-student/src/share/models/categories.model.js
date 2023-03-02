//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description create Categories
     */
    createCategories: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('categories')
                    .insert(data)
                    .onConflict('category_id')
                    .merge()
                    .returning(['category_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description get Categories id
     */
    getCategoriesById: async (student_query, return_data) => {
        const result = await knex('categories').select(return_data).where(student_query);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Update Categories
     */
    updateCategories: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('categories').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Get all Categories
     */
    getAllCategories: async (student_query, return_data) => {
        const result = await knex('categories').select(return_data).where(student_query);
        return result;
    },
};
