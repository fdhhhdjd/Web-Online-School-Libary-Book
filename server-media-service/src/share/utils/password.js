//! LIBRARY
const crypto = require('crypto');

//! SHARE
const CONFIGS = require('../configs/config');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @param {string} public_key
     * @created_at 24/02/2023
     * @description decode pem key
     * @returns {String}
     */
    decodePemPubKey(public_key) {
        return crypto.createPublicKey({
            key: public_key,
            type: CONFIGS.TYPE_PEM,
            format: CONFIGS.ENCODE_PEM,
        });
    },
};
