//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description create book
     */
    createBook: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('books').insert(data).onConflict('book_id').merge().returning(['book_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description get book id
     */
    getBookById: async (student_query, return_data) => {
        const result = await knex('books').select(return_data).where(student_query);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description Update book
     */
    updateBook: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('books').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @updated_at 07/02/2023
     * @description Get all book
     */
    getAllBook: async (student_query, return_data) => {
        const result = await knex('books').select(return_data).where(student_query).orderBy('updated_at', 'desc');
        return result;
    },
};
