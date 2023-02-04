const jwt = require('jsonwebtoken');

const CONFIGS = require('../configs/config');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Create accept Token
     * @returns {Number}
     */
    createAcceptToken(character_access_token) {
        return jwt.sign(character_access_token, CONFIGS.ACCESS_TOKEN_SECRET, {
            expiresIn: CONFIGS.EXPIRES_ACCESS_TOKEN,
        });
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Create Refresh Token
     * @returns {Number}
     */
    createRefreshToken(character_refresh_token) {
        return jwt.sign(character_refresh_token, CONFIGS.REFRESH_TOKEN_SECRET, {
            expiresIn: CONFIGS.EXPIRES_REFRESH_TOKEN,
        });
    },
};
