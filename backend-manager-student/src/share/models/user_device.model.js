const CONSTANTS = require('../configs/constants');

const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description insertDevice
     */
    insertDevice: (data) => new Promise((resolve, reject) => {
        try {
            const result = knex('user_device')
                .insert(data)
                .onConflict('device_uuid')
                .merge()
                .returning(['device_uuid']);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description insertDevice
     */
    checkUserByToken: (refresh_token, device_uuid) => new Promise((resolve, reject) => {
        try {
            let user = knex('user_device')
                .join('user', 'user.user_id', 'user_device.user_id')
                .where('user.isdeleted', '=', CONSTANTS.DELETED_DISABLE)
                .andWhere('user_device.refresh_token', refresh_token)
                .andWhere('user_device.device_uuid', device_uuid)
                .select('user.user_id', 'user.role', 'user.name');
            resolve(user);
        } catch (error) {
            reject(error);
        }
    }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 05/02/2023
     * @description updateDevice
     */
    updateDevice: (data, user) => new Promise((resolve, reject) => {
        try {
            const result = knex('user_device').where('user_id', user).update(data).returning(['device_uuid']);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/02/2023
     * @description Get Device Id
     */
    getDeviceId: (student_query, return_data) => {
        try {
            const student = knex('user_device').select(return_data).where(student_query);
            return student;
        } catch (error) {
            return error;
        }
    },
};
