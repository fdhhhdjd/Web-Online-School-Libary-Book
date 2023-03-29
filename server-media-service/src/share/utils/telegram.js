const { BOT, KEY_CHAT_ID } = require('../db/bot_telegram');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 29/03/2023
 * @description Send Message bot
 */
const sendTelegram = (message) => {
    BOT.sendMessage(KEY_CHAT_ID, message);
};
module.exports = {
    sendTelegram,
};
