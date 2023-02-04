const knex = require('../db/postgresql');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description insertDevice
     */
    insertDevice: (data) =>
        new Promise((resolve, reject) => {
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
};
