//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description create Author
     */
    createAuthor: (data) => new Promise((resolve, reject) => {
        try {
            const result = knex('authors').insert(data).onConflict('author_id').merge()
                .returning(['author_id']);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description get Author id
     */
    getAuthorById: async (student_query, return_data) => {
        const result = await knex('authors').select(return_data).where(student_query);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description Update Author
     */
    updateAuthor: async (data, student_query, return_data) => new Promise((resolve, reject) => {
        try {
            const result = knex('authors').update(data).where(student_query).returning(return_data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/01/2023
     * @description Get all Author
     */
    getAllAuthor: async (student_query, return_data) => {
        const result = await knex('authors').select(return_data).where(student_query);
        return result;
    },
};
