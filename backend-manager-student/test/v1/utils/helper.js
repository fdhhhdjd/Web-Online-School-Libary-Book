const CONSTANTS = require('../configs/constants');
module.exports = {
    /**
     * /**
     * @Author Nguyễn Tiến Tài
     * @Created_at 17/12/02022
     * @Description Header Api axios
     * @param {Request.headers} headers
     * @returns {object}
     */
    headerAPi() {
        let headers = {
            'X-DEVICE-ID': '123-123-123-123-21',
            'X-OS-TYPE': 'web',
            'X-OS-VERSION': '1.0',
            'X-APP-VERSION': '1.0',
            'X-DEVICE-NAME': 'IOS',
            Authorization: `Bearer ${CONSTANTS.TOKEN_TEST}`,
        };
        return headers;
    },
};
