//! Library
const jwt = require('jsonwebtoken');

//! Share
const CONFIGS = require('../configs/config');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Very accessToken
     * @returns {boolean}
     */
    verifyAccessToken(accessToken, public_key) {
        return jwt.verify(accessToken, public_key, { algorithms: [CONFIGS.ALGORITHM_TOKEN] }, (err, decode) => decode);
    },
};
