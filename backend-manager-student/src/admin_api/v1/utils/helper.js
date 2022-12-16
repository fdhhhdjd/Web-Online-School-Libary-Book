const geo_ip = require('geoip-lite');

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
     * @description validate email with emailRegex
     * @returns {boolean} true: this email is valid, false: this is not a email
     */
    validateEmail(email) {
        // Validates the email address
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);
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
};
