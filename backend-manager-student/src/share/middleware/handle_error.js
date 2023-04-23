//! SHARE
const CONSTANTS = require('../configs/constants');
const KEY_DUPLICATE = require('../configs/key_duplicate');
const MESSAGES = require('../configs/message');

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

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 25/03/2023
     * @description returnDuplicate
     * @function returnDuplicate
     * @param { error }
     * @return { String }
     */
    returnDuplicate: (error) => {
        const constraint = error.constraint;
        let message;
        switch (constraint) {
        case KEY_DUPLICATE.DUPLICATE_KEY_EMAIL:
            message = MESSAGES.GENERAL.EXITS_EMAIL;
            break;
        case KEY_DUPLICATE.DUPLICATE_KEY_PHONE:
            message = MESSAGES.GENERAL.EXITS_PHONE;
            break;
        case KEY_DUPLICATE.DUPLICATE_KEY_MSSV:
            message = MESSAGES.GENERAL.EXITS_MSSV;
            break;
        default:
            message = MESSAGES.GENERAL.ERROR_UNKNOWN;
            break;
        }
        return message;
    },
};
