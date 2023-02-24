const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 11/12/2022
     * @update_at 23/01/2022
     * @description Add user
     */
    addUser: (data) => new Promise((resolve, reject) => {
        try {
            const result = knex('user')
                .insert(data)
                .onConflict('user_id', 'email', 'phone_number', 'mssv')
                .merge()
                .returning(['user_id']);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 02/01/2023
     * @description Get student info by ID
     */
    getStudentById: async (student_query, return_data) => {
        const student = await knex('user').select(return_data).where(student_query);
        return student;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 13/02/2023
     * @description Update student
     */
    updateStudent: async (data, student_query, return_data) => new Promise((resolve, reject) => {
        try {
            const result = knex('user').update(data).where(student_query).returning(return_data);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),
};
