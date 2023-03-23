//! SERVICE
const email_sender_user = require('./user_api/services/email_sender_users/email_sender_user');
const email_sender_admin = require('./admin_api/services/email_sender_admin/email_sender_user');

//! DB
const { REDIS_MASTER } = require('../../share/db/redis_db');

//! SHARE
const CONSTANTS = require('../../share/configs/constants');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 19/02/2023
 * @description Setup Redis PubSub Server Send Email.
 */

//! New Map Users
const userChannelHandlers = new Map();
userChannelHandlers.set(CONSTANTS.KEY_USER_WARNING_TOKEN, email_sender_user.sendEmailUserWarningHacker);
userChannelHandlers.set(CONSTANTS.KEY_USER_LINK_RESET_PASSWORD, email_sender_user.sendEmailUserLinkResetPassword);
userChannelHandlers.set(CONSTANTS.KEY_USER_LINK_VERIFICATION, email_sender_user.sendEmailUserLinkVerification);

//! New Map Admin
const adminChannelHandlers = new Map();
adminChannelHandlers.set(CONSTANTS.KEY_ADMIN_WARNING_TOKEN, email_sender_admin.sendEmailUser);

//! Start Subscribe to user and admin channels
REDIS_MASTER.on('ready', async () => {
    try {
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_USER_EXIT_U}`);
        REDIS_MASTER.psubscribe(`${CONSTANTS.KEY_ADMIN_EXIT_A}`);

        console.info(`Redis subscribed to all channels starting with ${CONSTANTS.KEY_USER_EXIT_U} or ${CONSTANTS.KEY_ADMIN_EXIT_A}`);
    } catch (error) {
        console.error('Failed to subscribe to Redis channels:', error);
    }
});

//! Take queue Sub of Pub
REDIS_MASTER.on('pmessage', async (pattern, channel, message) => {
    console.info(pattern, '::::::::pattern');
    const handler = userChannelHandlers.get(channel) || adminChannelHandlers.get(channel);
    if (handler) {
        try {
            handler(JSON.parse(message));
        } catch (error) {
            console.error(`Error processing Redis message on channel ${channel}:`, error);
        }
    }
});
