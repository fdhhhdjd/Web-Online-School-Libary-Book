const REGEX = require('../configs/regex');
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 06/02/2023
     * @description from String template to URI
     * @param {template,data}
     * @returns {string}
     */
    getURIFromTemplate(template, data) {
        return template.replace(REGEX.REGEX_IS_STRING_PARAM, (_, key) => data[key]);
    },
};
