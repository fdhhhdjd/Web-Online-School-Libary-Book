const { reasonPhraseCodeProNewMap } = require('../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/12/2022
     * @description returnReasons
     * @function returnReasons
     * @param { code }
     * @return { String }
     */
    returnReasons: (code) =>
        reasonPhraseCodeProNewMap().get(code) || reasonPhraseCodeProNewMap().get('default'),
};
