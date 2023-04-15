//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description create book categories
     */
    createBookCategories: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('book_categories').insert(data).returning(['book_categories_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description get Book Categories By Id
     */
    getBookCategoriesById: async (student_query, return_data) => {
        const result = await knex('book_categories').select(return_data).where(student_query);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description Update book Categories
     */
    updateBookCategories: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('book_categories').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description get All Book Categories
     */
    getAllBookCategories: async (student_query, return_data) => {
        const result = await knex('book_categories')
            .select(return_data)
            .where(student_query)
            .orderBy('updated_at', 'desc');
        return result;
    },
};
