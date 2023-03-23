//! SHARE
const CONSTANTS = require('../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
     * @description returnReasons
     * @function returnReasons
     * @param { code }
     * @return { String }
     */
    returnReasons: (code) =>
        CONSTANTS.reasonPhraseCodeProNewMap().get(code.toString())
        || CONSTANTS.reasonPhraseCodeProNewMap().get(CONSTANTS.HTTP.NO_STATUS_DEFAULT),
};
