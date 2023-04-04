//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description create favorite_book
     */
    createFavorite: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('favorite_book')
                    .insert(data)
                    .onConflict('favorite_book_id')
                    .merge()
                    .returning(['favorite_book_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description Update Favorite
     */
    updateFavorite: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('favorite_book').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description Get all Favorite
     */
    getAllFavorite: async (student_query, return_data) => {
        const result = await knex('favorite_book')
            .select(return_data)
            .where(student_query)
            .orderBy('updated_at', 'desc');
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/04/2023
     * @description get Favorite id
     */
    getFavoriteById: async (student_query, return_data) => {
        const result = await knex('favorite_book').select(return_data).where(student_query);
        return result;
    },
};
