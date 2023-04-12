//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @description Comment Create
     */
    createComment: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('book_comments ')
                    .insert(data)
                    .onConflict('comment_id')
                    .merge()
                    .returning(['comment_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @description get Comment id
     */
    getCommentById: async (student_query, return_data) => {
        const result = await knex('book_comments').select(return_data).where(student_query);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @description Get all comment
     */
    getAllComment: async (student_query, return_data) => {
        const result = await knex('book_comments')
            .select(return_data)
            .where(student_query)
            .orderBy('updated_at', 'desc');
        return result;
    },
};
