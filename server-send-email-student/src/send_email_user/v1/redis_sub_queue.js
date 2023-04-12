//! SERVICE
const email_sender_user = require('./user_api/services/email_sender_users/email_sender_user');
const email_sender_admin = require('./admin_api/services/email_sender_admin/email_sender_user');
const telegram_sender_message = require('./telegram/services/send_message_telegram');
//! DB
const { REDIS_MASTER } = require('../../share/db/redis_db');

//! SHARE
const CONSTANTS = require('../../share/configs/constants');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 19/02/2023
 * @created_at 30/03/2023
 * @description Setup Redis PubSub Server Send Email and telegram
 */

//! New Map Users
const userChannelHandlers = new Map();
userChannelHandlers.set(
    CONSTANTS.KEY_USER_WARNING_TOKEN, email_sender_user.sendEmailUserWarningHacker,
);
userChannelHandlers.set(
    CONSTANTS.KEY_USER_LINK_RESET_PASSWORD, email_sender_user.sendEmailUserLinkResetPassword,
);
userChannelHandlers.set(
    CONSTANTS.KEY_USER_LINK_VERIFICATION, email_sender_user.sendEmailUserLinkVerification,
);
userChannelHandlers.set(
    CONSTANTS.KEY_SERVER.REDIS_SERVER_STUDENT, telegram_sender_message.handleException,
);

//! New Map Admin
const adminChannelHandlers = new Map();
adminChannelHandlers.set(
    CONSTANTS.KEY_ADMIN_WARNING_TOKEN, email_sender_admin.sendEmailUser,
);
adminChannelHandlers.set(
    CONSTANTS.KEY_SERVER.REDIS_SERVER_ADMIN, telegram_sender_message.handleException,
);
//! New Map MEDIA
const mediaChannelHandlers = new Map();
mediaChannelHandlers.set(
    CONSTANTS.KEY_SERVER.REDIS_SERVER_MEDIA, telegram_sender_message.handleException,
);

//! New Map CRON
const cronChannelHandlers = new Map();
cronChannelHandlers.set(
    CONSTANTS.KEY_SERVER.REDIS_SERVER_CRON, telegram_sender_message.handleException,
);

//! New Map DB
const dbChannelHandlers = new Map();
cronChannelHandlers.set(
    CONSTANTS.KEY_SERVER.REDIS_DB, telegram_sender_message.handleException,
);

//! Start Subscribe to user and admin channels
REDIS_MASTER.on('ready', async () => {
    try {
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_USER_EXIT_U}`);
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_ADMIN_EXIT_A}`);
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_MEDIA_EXIT_M}`);
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_CRON_EXIT_C}`);
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_CRON_EXIT_DB}`);

        console.info(`Redis subscribed to all channels starting with ${CONSTANTS.KEY_USER_EXIT_U} or ${CONSTANTS.KEY_ADMIN_EXIT_A} or ${CONSTANTS.KEY_MEDIA_EXIT_M} or ${CONSTANTS.KEY_CRON_EXIT_C} or ${CONSTANTS.KEY_CRON_EXIT_DB}  `);
    } catch (error) {
        console.error('Failed to subscribe to Redis channels:', error);
    }
});

//! Take queue Sub of Pub
REDIS_MASTER.on('pmessage', async (pattern, channel, message) => {
    console.info(pattern, '::::::::pattern');
    const handler = userChannelHandlers.get(channel)
        || adminChannelHandlers.get(channel)
        || mediaChannelHandlers.get(channel)
        || cronChannelHandlers.get(channel)
        || dbChannelHandlers.get(channel);
    if (handler) {
        try {
            handler(JSON.parse(message));
        } catch (error) {
            console.error(`Error processing Redis message on channel ${channel}:`, error);
        }
    }
});
