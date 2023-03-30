//! SHARE
const { sendTelegram } = require('../../../../share/utils/telegram');
/**
     * @author Nguyễn Tiến Tài
     * @created_at 30/03/2023
     * @description Send telegram
     * @function sendEmailUserWarningHacker
     * @return { Object }
    */
const sendMessageTelegram = {
    handleException: (message) => {
        try {
            return sendTelegram(message);
        } catch (error) {
            console.error(error);
        }
    },
};
module.exports = sendMessageTelegram;
