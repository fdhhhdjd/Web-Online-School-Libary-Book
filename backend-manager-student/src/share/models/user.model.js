const knex = require('../db/posgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 11/01/2023
     * @description Add user
     */
    addUser: async (data) => {
        try {
            return await knex('users').insert(data).returning(['name']);
        } catch (error) {
            throw new Error(error);
        }
    },
};
