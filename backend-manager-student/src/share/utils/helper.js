const geo_ip = require('geoip-lite');
const fs = require('fs');
const xlsx = require('node-xlsx');
const CONFIGS = require('../configs/config');
const CONSTANTS = require('../configs/constants');
const CLIENT = require('twilio')(CONFIGS.ACCOUNT_SID_KEY, CONFIGS.AUTH_TOKEN_KEY);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 16/12/2022
 * @description File helper General check data input
 * @param { function(callback)=>{}}
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} email
     * @created_at 16/12/2022
     * @update_at 20/01/2023
     * @description validate email with emailRegex
     * @returns {boolean} true: this email is valid, false: this is not a email
     */
    validateEmail(email) {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const emailParts = email.split('@');

        if (emailParts.length !== 2) return false;

        const account = emailParts[0];
        const address = emailParts[1];
        if (account.length > 64) return false;

        if (address.length > 255) return false;

        const domainParts = address.split('.');
        if (domainParts.some((part) => part.length > 63)) return false;
        if (!re.test(String(email).toLowerCase())) return false;

        return true;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} date
     * @created_at 16/12/2022
     * @description validate input date format as ISO standard
     * @returns {boolean}
     */
    validateIsoDate(date) {
        const dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g;
        return dateRegex.test(date);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} phone
     * @created_at 16/12/2022
     * @description validate phone number
     * @returns {boolean}
     */
    validatePhone(phone) {
        // var phoneRegex = /^+?([0-9]{2})\)?([0-9]{9})$/;
        // var phoneRegex = /^(\+91-|\+91|0)?\d{11}$/;
        // var vnf_regex = /((09|03|07|08|05|01)+([0-9]{9|8})\b)/g;
        const phoneRegex = /^[0-9\+]{10,15}$/g;
        return phoneRegex.test(phone);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} time
     * @created_at 16/12/2022
     * @description validate slot_time: from_time/to_time format
     *  @returns {boolean}
     */
    validateTime(time) {
        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3])(:[0-5]\d)(:[0-5]\d)$/g;
        return timeRegex.test(time);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} address_ip
     * @created_at 16/12/2022
     * @description take info ip customer
     *  @returns {number}
     */
    findingLocationByIP(ip) {
        const geo = geo_ip.lookup(ip);
        return geo;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {Request.headers} headers
     * @created_at 17/12/2022
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
            // push_token: headers['X-PUSH-TOKEN'] || headers['x-push-token'] || '',
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
     * @created_at 12/01/2023
     * @description data excel
     * @returns {Array}
     */
    getDataExcel() {
        return xlsx.parse(fs.readFileSync('src/file/Demo.xlsx'));
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/01/2023
     * @description Data phone
     * @returns {Array}
     */
    getDataPhone(phoneNumber) {
        return CLIENT.lookups
            .phoneNumbers(phoneNumber)
            .fetch({ countryCode: CONSTANTS._COUNTRY_CODE, type: [CONSTANTS._SERVICE_PROVIDER] })
            .then((phone_number) => phone_number)
            .catch((error) => {
                console.error(error);
                return null;
            });
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/01/2023
     * @description Mobile network
     * @returns {String}
     */
    returnMobileNetWork: (code) =>
        CONSTANTS.mobileCodeProNewMap().get(code) || CONSTANTS.mobileCodeProNewMap().get('default'),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 20/01/2023
     * @description Mobile mask fist and last
     * @returns {String}
     */
    maskFistPhoneNumber(phoneNumber) {
        return phoneNumber.substring(0, 4) + '*'.repeat(phoneNumber.length - 4);
    },
    maskLastPhoneNumber(phoneNumber) {
        return '*'.repeat(phoneNumber.length - 4) + phoneNumber.substring(phoneNumber.length - 4);
    },
};
