const geo_ip = require('geoip-lite');
const fs = require('fs');
const xlsx = require('node-xlsx');
const UAParser = require('ua-parser-js');
const axios = require('axios');

const CONFIGS = require('../configs/config');
const CONSTANTS = require('../configs/constants');
const REGEX = require('../configs/regex');
const TOKENS = require('./token');
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
        const re = REGEX.REGEX_EMAIL;

        if (!re.test(String(email).toLowerCase())) return false;

        const emailParts = email.split('@');
        if (emailParts.length !== 2) return false;

        const account = emailParts[0];
        const address = emailParts[1];
        if (account.length > 64 || address.length > 255) return false;

        const domainParts = address.split('.');
        if (domainParts.some((part) => part.length > 63)) return false;

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
        const dateRegex = REGEX.REGEX_DATE;
        return dateRegex.test(date);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} phone
     * @created_at 16/12/2022
     * @update_at 22/01/2023
     * @description validate phone number, add phone VN
     * @returns {boolean}
     */
    validatePhone(phone) {
        const phoneVietNam = REGEX.REGEX_PHONE;
        return phoneVietNam.test(phone);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} time
     * @created_at 16/12/2022
     * @description validate slot_time: from_time/to_time format
     *  @returns {boolean}
     */
    validateTime(time) {
        const timeRegex = REGEX.REGEX_TIME;
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
     * @updated_at 22/03/2022
     * @description validate device
     * @returns {object}
     */
    getDeviceFromHeaders(headers) {
        const getHeader = (key) => headers[key.toLowerCase()] || '';

        const device = {
            device_id: getHeader('X-DEVICE-ID'),
            os_type: getHeader('X-OS-TYPE'),
            os_version: getHeader('X-OS-VERSION'),
            app_version: getHeader('X-APP-VERSION'),
            device_name: getHeader('X-DEVICE-NAME'),
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
     * @created_at 31/01/2023
     * @description data excel cloud online
     * @returns {url}
     */
    async getDataExcelCloud(url_document) {
        const response = await axios.get(`${url_document}`, {
            responseType: CONSTANTS.RESPONSE_TYPE,
        });
        return xlsx.parse(response.data);
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
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/01/2023
     * @description Promise Level 3
     * @returns {promise}
     */
    handleRequest: (promise) => promise.then((data) => [undefined, data]).catch((error) => [error, undefined]),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 02/01/2023
     * @description Convert 'DD/MM/YYYY' => 'YYYY-MM-DD';
     * @returns {date}
     */
    handleConvertDate: (date) => new Date(date).toISOString().substring(0, 10),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 02/01/2023
     * @description remove - in  YYYY-MM-DD
     * @returns {date}
     */
    handleRemoveHyphen: (date) => date.replace(REGEX.REGEX_DATE_HYPHEN, ''),
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 02/02/2023
     * @description isNumeric
     * @returns {Number}
     */
    isNumeric: (value) => {
        const number = REGEX.REGEX_IS_NUMBER;
        return number.test(value);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description operating system
     * @returns {Object}
     */
    operatingSystem: (header) => {
        // window.navigator.userAgent
        const parser = new UAParser();
        parser.setUA(header);
        return parser.getResult();
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 04/02/2023
     * @description Verify time exp refreshToken
     * @returns {boolean}
     */
    isRefreshTokenValid(refreshToken, public_key) {
        try {
            // Check verify accessToken
            const decoded = TOKENS.verifyToken(refreshToken, public_key);

            // Check if token has expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (decoded.exp <= currentTime) {
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
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
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 06/02/2023
     * @description from String template to URI
     * @param {template,data}
     * @returns {string}
     */
    getURIFromTemplate(template, data) {
        return template.replace(REGEX.REGEX_IS_STRING_PARAM, (_, key) => data[key]);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 06/02/2023
     * @description random time
     * @param {time,maxNumber}
     * @returns {string}
     */
    addTimeRandomNumber(time, maxNumber) {
        return time + Math.floor(Math.random() * maxNumber);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/02/2023
     * @description Convert date and time
     * @param {time}
     * @returns {string}
     */
    convertTTLtoDateTime(ttl) {
        const now = new Date();
        const expirationTime = now.getTime() + ttl * 1000 + CONSTANTS.TIME_ZONE_VN;
        const expirationDate = new Date(expirationTime);

        const year = expirationDate.getFullYear();
        const month = (expirationDate.getMonth() + 1).toString().padStart(2, '0');
        const day = expirationDate.getDate().toString().padStart(2, '0');
        const hours = expirationDate.getHours().toString().padStart(2, '0');
        const minutes = expirationDate.getMinutes().toString().padStart(2, '0');
        const seconds = expirationDate.getSeconds().toString().padStart(2, '0');

        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
    },
    /**
     * Method Convert phone
     * @author Nguyen Tien Tai
     * @created_at 15/01/2023
     * @function isExpired
     * @param {time_expire_reset}
     * @returns {Boolean}
     */
    isExpired(time_expire_reset) {
        const now = Date.now();
        const diff = time_expire_reset - now;
        if (diff > 0) {
            // Not expired yet
            return false;
        }
        // Expired
        return true;
    },
    /**
     * Method Convert phone
     * @author Nguyen Tien Tai
     * @created_at 24/03/2023
     * @function isValidBigInt
     * @param {id}
     * @returns {Boolean}
     */
    validateBigInt(id) {
        try {
            const bigIntValue = BigInt(id);
            if (bigIntValue.toString() !== id) {
                return false;
            }
            // input is a valid bigint
            return true;
        } catch (error) {
            return false;
        }
    },
};
