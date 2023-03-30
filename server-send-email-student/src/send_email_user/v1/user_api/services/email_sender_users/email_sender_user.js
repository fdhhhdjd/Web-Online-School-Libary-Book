//! LIBARY
const retry = require('async-retry');
const path = require('path');

//! SERVICE
const send_email = require('../../../../../share/configs/email_template');

//! SHARE
const CONSTANTS = require('../../../../../share/configs/constants');
const CONFIGS = require('../../../../../share/configs/config');
const TEMPLATE_EMAIL = require('../../../../../share/configs/template_email');
const HELPERS = require('../../../../../share/utils/helpers');

const emailSenderUsers = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/02/2023
     * @description Send Email Warning hacker Take Refetch Token
     * @function sendEmailUserWarningHacker
     * @return { Object }
     */
    sendEmailUserWarningHacker: async (message_sub) => {
        const type = CONSTANTS.TYPE_STUDENT;
        const message = message_sub.data_renew_token;
        const option = {
            from: CONFIGS.SMTP_MAIL,
            to: message.email,
            subject: TEMPLATE_EMAIL.STUDENT_WARNING_HACKER.SUBJECT,
            template: TEMPLATE_EMAIL.STUDENT_WARNING_HACKER.TEMPLATE,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.resolve('./src/share/assets', 'logo', 'logo.png'),
                    cid: 'image_logo',
                },
            ],
            context: {
                data: message,
            },
        };
        try {
            await send_email(option, type);
            console.info('Send_Email Success::::::', message.email);
        } catch (error) {
            console.error('Lỗi khi gửi email:', error.message);
            await retry(send_email.bind(null, option), { retries: CONSTANTS.NUMBER_RETRY_EMAIL });
        }
    }, /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/02/2023
     * @description Send Email reset Password
     * @function sendEmailUserLinkResetPassword
     * @return { Object }
     */
    sendEmailUserLinkResetPassword: async (message_sub) => {
        const type = CONSTANTS.TYPE_STUDENT;
        const message = message_sub.data_reset;
        message.support_email = CONFIGS.SMTP_MAIL;
        const name_subject = HELPERS.getURIFromTemplate1(TEMPLATE_EMAIL.STUDENT_RESET_PASSWORD.SUBJECT, {
            name: message.name,
        });
        const option = {
            from: CONFIGS.SMTP_MAIL,
            to: message.email,
            subject: name_subject,
            template: TEMPLATE_EMAIL.STUDENT_RESET_PASSWORD.TEMPLATE,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.resolve('./src/share/assets', 'logo', 'logo.png'),
                    cid: 'image_logo',
                },
            ],
            context: {
                data: message,
            },
        };
        try {
            await send_email(option, type);
            console.info('Send_Email Success::::::', message);
        } catch (error) {
            console.error('Lỗi khi gửi email:', error.message);
            await retry(send_email.bind(null, option), { retries: CONSTANTS.NUMBER_RETRY_EMAIL });
        }
    },
    /**
 * @author Nguyễn Tiến Tài
 * @created_at 27/02/2023
 * @description Send Email verification
 * @function sendEmailUserLinkVerification
 * @return { Object }
 */
    sendEmailUserLinkVerification: async (message_sub) => {
        const type = CONSTANTS.TYPE_STUDENT;
        const message = message_sub;
        message.support_email = CONFIGS.SMTP_MAIL;
        const name_subject = HELPERS.getURIFromTemplate(TEMPLATE_EMAIL.STUDENT_VERIFICATION_EMAIL.SUBJECT, {
            name: message.name,
        });
        const option = {
            from: CONFIGS.SMTP_MAIL,
            to: message.email,
            subject: name_subject,
            template: TEMPLATE_EMAIL.STUDENT_VERIFICATION_EMAIL.TEMPLATE,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.resolve('./src/share/assets', 'logo', 'logo.png'),
                    cid: 'image_logo',
                },
            ],
            context: {
                data: message,
            },
        };
        try {
            await send_email(option, type);
            console.info('Send_Email Success::::::', message);
        } catch (error) {
            console.error('Lỗi khi gửi email:', error.message);
            await retry(send_email.bind(null, option), { retries: CONSTANTS.NUMBER_RETRY_EMAIL });
        }
    },
};
module.exports = emailSenderUsers;
