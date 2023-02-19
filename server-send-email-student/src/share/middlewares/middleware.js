const CONSTANTS = require('../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/02/2023
     * @description returnReasons
     * @function returnReasons
     * @param { code }
     * @return { String }
     */
    returnReasons: (code) =>
        CONSTANTS.reasonPhraseCodeProNewMap().get(code) || CONSTANTS.reasonPhraseCodeProNewMap().get('default'),
};
