//! DATABASE
const knex = require('../db/postgresql');

//! SHARE
const CONSTANTS = require('../configs/constants');

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
    getBookById: async (student_query) => {
        const result = await knex('books')
            .join('authors', 'books.author_id', '=', 'authors.author_id')
            .where({
                'books.isdeleted': student_query.isdeleted,
                'books.book_id': student_query.book_id,
            })
            .select(
                {
                    name_author: 'authors.name',
                    dob_author: 'authors.dob',
                    gender_author: 'authors.gender',
                    image_author: 'authors.avatar_uri',
                },
                'books.*',
            );
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
    getAllBook: async () => {
        const result = await knex('books')
            .join('authors', 'books.author_id', '=', 'authors.author_id')
            .where('books.isdeleted', '=', CONSTANTS.DELETED_DISABLE)
            .select(
                {
                    name_author: 'authors.name',
                    dob_author: 'authors.dob',
                    gender_author: 'authors.gender',
                    image_author: 'authors.avatar_uri',
                },
                'books.*',
            )
            .orderBy('books.updated_at', 'desc');
        return result;
    },
};
