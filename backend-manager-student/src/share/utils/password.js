const REGEX = require('../configs/regex');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} password
     * @created_at 22/01/2022
     * @description validate full password can return data
     * @returns {boolean}
     */
    isValidPassword(password) {
        // Must be 8 characters or more long
        if (password.length < 8) {
            return false;
        }
        // Check character UpperCase LowerCase
        let hasUpperCase = false;
        let hasLowerCase = false;
        for (let i = 0; i < password.length; i++) {
            if (password[i] === password[i].toUpperCase()) {
                hasUpperCase = true;
            }
            if (password[i] === password[i].toLowerCase()) {
                hasLowerCase = true;
            }
            if (hasUpperCase && hasLowerCase) {
                break;
            }
        }
        if (!hasUpperCase || !hasLowerCase) {
            return false;
        }

        // Check number and character
        let hasNumber = false;
        let hasSpecialChar = false;
        const specialChars = REGEX.REGEX_CHARACTER;
        for (let i = 0; i < password.length; i++) {
            if (!isNaN(password[i])) {
                hasNumber = true;
            }
            if (specialChars.indexOf(password[i]) !== -1) {
                hasSpecialChar = true;
            }
            if (hasNumber && hasSpecialChar) {
                break;
            }
        }
        if (!hasNumber || !hasSpecialChar) {
            return false;
        }

        // Check not character
        const invalidChars = REGEX.REGEX_NOT_CHARACTER;
        for (let i = 0; i < password.length; i++) {
            if (invalidChars.indexOf(password[i]) !== -1) {
                return false;
            }
        }

        return true;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} password
     * @created_at 22/01/2022
     * @description validate full password regex
     * @returns {boolean}
     */
    isPassword(password) {
        // Must be 8 characters or more long
        const password_length = password.length < 8;

        if (password_length) {
            return false;
        }
        const reg = new RegExp(REGEX.REGEX_PASSWORD).test(password);
        return reg;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} password
     * @created_at 01/02/2022
     * @description encode password
     * @returns {boolean}
     */
    encodePassword: (password) => bcrypt.hash(password, CONSTANTS.SALT_ROUNDS),
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} password
     * @created_at 01/02/2022
     * @description compare password
     * @returns {boolean}
     */
    comparePassword: (password, password_hash) => bcrypt.compare(password, password_hash),
};
