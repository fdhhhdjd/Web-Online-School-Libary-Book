//! LIBRARY
const { Sonyflake } = require('sonyflake');
const OtpGenerator = require('otp-generator');

//! SHARE
const REGEX = require('../configs/regex');
const CONFIGS = require('../configs/config');
const CONSTANTS = require('../configs/constants');

const SONY_FLAKE = new Sonyflake({
    machineId: CONSTANTS.DETERMINED_COMPUTER, // in range 2^16
    epoch: CONSTANTS.TIME_START_SYSTEMS, // timestamp
});
const OPTION_OTP = {
    algorithm: CONFIGS.ALGORITHM_OTP_OPTION,
    seed: CONFIGS.CUSTOM_SEED_OTP_OPTION,
    time: CONSTANTS._30_SECONDS,
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
};
/**
 * @author Nguyễn Tiến Tài
 * @created_at 16/12/2022
 * @description File random data general
 * @param { function(callback)=>{}}
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @param {number} length
     * @created_at 16/12/2022
     * @description random character
     * @returns {string}
     */
    randomString(length) {
        let result = '';
        const characters = REGEX.REGEX_RANDOM;
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {null}
     * @created_at 16/12/2022
     * @description Method create random sonyflake for user code
     * @returns {number} (64bit - bigint)
     */
    createID() {
        const id = SONY_FLAKE.nextId();
        return id;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {null}
     * @created_at 23/01/2023
     * @description Random OTP
     * @returns {Number}
     */
    generatorOtp() {
        return OtpGenerator.generate(CONFIGS.RANDOM_NUMBER_OTP, OPTION_OTP);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {null}
     * @created_at 14/03/2023
     * @description Random time ttl redis
     * @returns {Number}
     */
    getRedisTTLWithRandom(initialTTL) {
        // Số random được thêm vào (tính bằng mili giây)
        const randomTime = Math.floor(Math.random() * CONSTANTS._1_HOURS_S_REDIS); // Tối đa 1 giờ

        // Tổng thời gian TTL
        const ttl = initialTTL + randomTime;

        return ttl;
    },
};
