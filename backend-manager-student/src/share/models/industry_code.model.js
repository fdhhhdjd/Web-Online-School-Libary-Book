//! DATABASE
const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/04/2023
     * @description create Industry Code
     */
    createIndustryCode: (data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('industry_code')
                    .insert(data)
                    .onConflict('industry_code_id')
                    .merge()
                    .returning(['industry_code_id']);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/04/2023
     * @description get Industry Code id
     */
    getIndustryCodeById: async (student_query, return_data) => {
        const result = await knex('industry_code').select(return_data).where(student_query);
        return result;
    },

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/04/2023
     * @description Update Industry Code
     */
    updateIndustryCode: async (data, student_query, return_data) =>
        new Promise((resolve, reject) => {
            try {
                const result = knex('industry_code').update(data).where(student_query).returning(return_data);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }),

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/04/2023
     * @description Get all Industry Code
     */
    getAllIndustryCode: async (student_query, return_data) => {
        const result = await knex('industry_code')
            .select(return_data)
            .where(student_query)
            .orderBy('updated_at', 'desc');
        return result;
    },
};
