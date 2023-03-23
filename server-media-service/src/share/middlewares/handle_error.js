//! SHARE
const { reasonPhraseCodeProNewMap } = require('../configs/constants');
const CONSTANTS = require('../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/12/2022
     * @updated_at 23/03/2022
     * @description returnReasons
     * @function returnReasons
     * @param { code }
     * @return { String }
     */
    returnReasons: (code) => reasonPhraseCodeProNewMap().get(code.toString()) || reasonPhraseCodeProNewMap().get(CONSTANTS.HTTP.NO_STATUS_DEFAULT),
};
