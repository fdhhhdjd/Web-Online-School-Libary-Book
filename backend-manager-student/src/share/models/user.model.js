//! SHARE
const CONSTANTS = require('../configs/constants');

//! DATABASE
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
     * @created_at 24/01/2023
     * @description Get student info by ID
     */
    getStudentJoinPhoneById: async (student_query, return_data) => {
        const student = await knex('user')
            .leftJoin('phone', 'user.phone_id', '=', 'phone.phone_id')
            .where({
                'user.isdeleted': student_query.isdeleted,
                'user.user_id': student_query.user_id,
            })
            .select(
                {
                    phone_mobile_country_code: 'phone.mobile_country_code',
                    phone_mobile_network_code: 'phone.mobile_network_code',
                    phone_mobile_network_name: 'phone.mobile_network_name',
                },
                return_data,
            );
        return student;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 13/02/2023
     * @description Update student
     */
    updateStudent: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('user').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/02/2023
     * @description GET ID DIFFERENCE STUDENT
     */
    getAdminId: async (student_query, return_data) => {
        const admins = await knex('user')
            .select(return_data)
            .where(student_query)
            .whereNot('role', CONSTANTS.ROLE.ROLE_STUDENT);
        return admins;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/03/2023
     * @updated_at 29/03/2023
     * @description  Get All Student Join Phone
     */
    getAllStudentJoinPhone: async (student_query, return_data) => {
        const student = await knex('user')
            .leftJoin('phone', 'user.phone_id', '=', 'phone.phone_id')
            .where({
                'user.isdeleted': student_query.isdeleted,
                'user.role': student_query.role,
            })
            .modify((queryBuilder) => {
                if (student_query.user_id) {
                    queryBuilder.where('user_id', student_query.user_id);
                }
            })
            .select(
                {
                    phone_mobile_country_code: 'phone.mobile_country_code',
                    phone_mobile_network_code: 'phone.mobile_network_code',
                    phone_mobile_network_name: 'phone.mobile_network_name',
                },
                return_data,
            )
            .orderBy('user.updated_at', 'desc');
        return student;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/03/2023
     * @description create Student
     */
    createStudent: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result_student = knex('user').insert(data).onConflict('user_id').merge()
                    .returning(['user_id']);
                resolve(result_student);
            } catch (error) {
                reject(error);
            }
        }),
};
