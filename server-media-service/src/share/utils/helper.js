//! LIBRARY
const { Sonyflake } = require('sonyflake');

//! SHARE
const TOKENS = require('../../share/utils/token')
/**
* @author Nguyễn Tiến Tài
* @created_at 12/01/2023
* @description algorithm number
* @return {Number}
*/
const machineNo = process.env.MACHINE_NO || 0 // default 0: first process
const epoch_date = Date.UTC(2020, 01, 01, 0, 0, 0)

const SONYFLAKE_IMG = new Sonyflake({
    machineId: (machineNo * 10) + 0, // 0 = type image
    epoch: epoch_date,
});

const SONYFLAKE_VID = new Sonyflake({
    machineId: (machineNo * 10) + 1, // 1 = type video
    epoch: epoch_date,
});

const SONYFLAKE_AUD = new Sonyflake({
    machineId: (machineNo * 10) + 2, // 2 = type audio
    epoch: epoch_date,
});

module.exports = {
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 12/01/2023
    * @description Create Id
    * @param type
    * @return {Number}
    */
    createID: (type) => {
        if (type == 'image') return SONYFLAKE_IMG.nextId();
        else if (type == 'video') return SONYFLAKE_VID.nextId();
        else if (type == 'audio') return SONYFLAKE_AUD.nextId();

        return false
    },
    /**
    * @author Nguyễn Tiến Tài
    * @param {Request.headers} headers
    * @created_at 03/01/2022
    * @description validate device
    * @returns {object}
    */
    getDeviceFromHeaders(headers) {
        const device = {
            device_id: headers['X-DEVICE-ID'] || headers['x-device-id'],
            os_type: headers['X-OS-TYPE'] || headers['x-os-type'],
            os_version: headers['X-OS-VERSION'] || headers['x-os-version'],
            app_version: headers['X-APP-VERSION'] || headers['x-app-version'],
            device_name: headers['X-DEVICE-NAME'] || headers['x-device-name'] || '',
            // ip: headers['X-FORWARDED-FOR'] || headers['x-forwarded-for'] || '',
        };

        if (device.device_id && device.os_type && device.os_version && device.app_version) {
            return device;
        }
        console.error('Wrong header!', headers);
        return null;
    },
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 05/02/2023
    * @description Verify time exp accessToken
    * @returns {boolean}
    */
    isAccessTokenValid(accessToken, public_key) {
        try {
            // Check verify accessToken
            const decoded = TOKENS.verifyAccessToken(accessToken, public_key);

            // Check if token has expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp < currentTime) {
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }
}