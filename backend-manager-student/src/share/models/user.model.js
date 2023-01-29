const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 11/12/2022
     * @update_at 23/01/2022
     * @description Add user
     */
    addUser: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('users').insert(data).returning(['name']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
};
