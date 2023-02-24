//! Library
const jwt = require('jsonwebtoken');

//! Share
const CONFIGS = require('../configs/config');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Create accept Token
     * @returns {Number}
     */
    createAcceptToken(character_access_token, privateKey) {
        return jwt.sign(character_access_token, privateKey, {
            algorithm: CONFIGS.ALGORITHM_TOKEN,
            expiresIn: CONFIGS.EXPIRES_ACCESS_TOKEN,
        });
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Create Refresh Token
     * @returns {Number}
     */
    createRefreshToken(character_refresh_token, privateKey) {
        return jwt.sign(character_refresh_token, privateKey, {
            algorithm: CONFIGS.ALGORITHM_TOKEN,
            expiresIn: CONFIGS.EXPIRES_REFRESH_TOKEN,
        });
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/02/2023
     * @description Very refreshToken
     * @returns {boolean}
     */
    verifyToken(refreshToken, public_key) {
        return jwt.verify(refreshToken, public_key, { algorithms: [CONFIGS.ALGORITHM_TOKEN] }, (err, decode) => decode);
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/02/2023
     * @description Very accessToken
     * @returns {boolean}
     */
    verifyAccessToken(accessToken, public_key) {
        return jwt.verify(accessToken, public_key, { algorithms: [CONFIGS.ALGORITHM_TOKEN] }, (err, decode) => decode);
    },
};
