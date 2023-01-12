const { reasonPhraseCodeProNewMap } = require('../configs/constants');

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
        reasonPhraseCodeProNewMap().get(code) || reasonPhraseCodeProNewMap().get('default'),
};
