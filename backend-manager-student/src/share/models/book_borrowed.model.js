//! DATABASE
const knex = require('../db/postgresql');

//! SHARE
const CONSTANTS = require('../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2023
     * @description create BorrowBook
     */
    createBorrowBook: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('borrowed_book')
                    .insert(data)
                    .onConflict('borrowed_book_id')
                    .merge()
                    .returning(['borrowed_book_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2023
     * @description get BorrowBook id
     */
    getBorrowBookById: async (student_query, return_data) => {
        const result = await knex('borrowed_book').select(return_data).where(student_query);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2023
     * @description Update BorrowBook
     */
    updateBorrowBook: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('borrowed_book').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2023
     * @created_at 24/03/2023
     * @description Get all book and get detail
     */
    getBorrowBook: async (borrow_book_id, user_id) => {
        const result = await knex('borrowed_book')
            .join('books', 'books.book_id', '=', 'borrowed_book.book_id')
            .join('authors', 'books.author_id', '=', 'authors.author_id')
            .where('borrowed_book.isdeleted', '=', CONSTANTS.DELETED_DISABLE)
            .modify((queryBuilder) => {
                if (borrow_book_id && user_id) {
                    queryBuilder.where('borrowed_book_id', borrow_book_id).where('user_id', user_id);
                }
                if (borrow_book_id && !user_id) {
                    queryBuilder.where('borrowed_book_id', borrow_book_id);
                }
                if (!borrow_book_id && !user_id) {
                    queryBuilder.where('user_id', user_id);
                }
            })
            .select(
                'books.name',
                'books.image_uri',
                'books.description',
                'books.page_number',
                'borrowed_book.*',
                'authors.name',
                'authors.avatar_uri',
            )
            .orderBy('borrowed_book.updated_at', 'desc');
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2023
     * @description Transaction Update Borrow Book
     */
    transactionUpdateBorrowBook: async (data_update_book, data_update_borrow) =>
        new Promise(async (resolve, reject) => {
            // start transaction
            const trx = await knex.transaction();
            try {
                // Query 1: createBorrowBook
                const borrowBookId = await trx('borrowed_book')
                    .update({ status: data_update_borrow.status })
                    .where({ book_id: data_update_borrow.book_id, user_id: data_update_borrow.user_id })
                    .returning(['borrowed_book_id']);

                // Query 2: updateBorrowBook
                const updatedData = await trx('books')
                    .update({ quantity: data_update_book.quantity })
                    .where({ book_id: data_update_book.book_id })
                    .returning(['book_id']);

                // Commit transaction
                await trx.commit();
                return resolve(borrowBookId, updatedData);
            } catch (error) {
                trx.rollback();
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 08/03/2023
     * @description Transaction Borrow Book
     */
    transactionBorrowBook: async (data_insert, data_update) =>
        new Promise(async (resolve, reject) => {
            // start transaction
            const trx = await knex.transaction();
            try {
                // Query 1: createBorrowBook
                const borrowBookId = await trx('borrowed_book')
                    .insert(data_insert)
                    .onConflict('borrowed_book_id')
                    .merge()
                    .returning(['borrowed_book_id']);

                // Query 2: updateBorrowBook
                const updatedData = await trx('books')
                    .update(data_update)
                    .where({ book_id: data_insert.book_id })
                    .returning(['book_id']);

                // Commit transaction
                await trx.commit();
                return resolve(borrowBookId, updatedData);
            } catch (error) {
                trx.rollback();
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/03/2023
     * @description Check book Borrow Book
     */
    checkBorrowBook: async (user_query, return_data) => {
        const result = await knex('borrowed_book')
            .select(return_data)
            .where(user_query)
            .whereNot('status', CONSTANTS.STATUS_BORROW.DONE);
        return result;
    },
};
