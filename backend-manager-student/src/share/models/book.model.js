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
                const result = knex('books').insert(data).onConflict('book_id').merge()
                    .returning(['book_id']);
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
            .leftJoin('book_rates', 'books.book_id', '=', 'book_rates.book_id')
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
                {
                    star: 'book_rates.rating',
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
            .leftJoin('book_rates', 'books.book_id', '=', 'book_rates.book_id')
            .where('books.isdeleted', '=', CONSTANTS.DELETED_DISABLE)
            .select(
                {
                    name_author: 'authors.name',
                    dob_author: 'authors.dob',
                    gender_author: 'authors.gender',
                    image_author: 'authors.avatar_uri',
                },
                {
                    star: 'book_rates.rating',
                },
                'books.*',
            )
            .orderBy('books.updated_at', 'desc');
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 14/04/2023
     * @description Check author exit book
     */
    checkAuthorExitBook: async (student_query) => {
        const result = await knex('books').where(student_query).count();
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 14/04/2023
     * @updated_at 17/04/2023
     * @description Transaction Delete Book
     */
    transactionDeleteBook: async (data, student_query, return_data) =>
        new Promise(async (resolve, reject) => {
            // start transaction
            const trx = await knex.transaction();
            try {
                // Query 1: updateBorrowBook
                const updatedBook = trx('books').update(data).where(student_query).returning(return_data);

                // Query 2: updateBorrowBook
                const updateBorrowBook = trx('borrowed_book').update(data).where(student_query).returning(return_data);

                // Query 3: updateFavorite
                const updateFavorite = trx('favorite_book').update(data).where(student_query).returning(return_data);

                // Query 4: updateBookCategories
                const updateBookCategories = trx('book_categories')
                    .update(data)
                    .where(student_query)
                    .returning(return_data);

                // Run Sequential async function
                Promise.all([updatedBook, updateBorrowBook, updateFavorite, updateBookCategories])
                    .then((final_rs) => {
                        // Commit transaction
                        trx.commit();
                        return resolve(final_rs);
                    })
                    .catch((error) => {
                        trx.rollback();
                        reject(error);
                    });
            } catch (error) {
                trx.rollback();
                reject(error);
            }
        }),
};
