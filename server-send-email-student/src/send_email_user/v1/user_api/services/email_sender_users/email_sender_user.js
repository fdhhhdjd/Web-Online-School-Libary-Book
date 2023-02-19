//! LIBARY
const retry = require('async-retry');
const path = require('path')

//! SERVICE
const send_email = require('../../../../../share/configs/email_template');

//! SHARE
const CONSTANTS = require('../../../../../share/configs/constants')
const CONFIGS = require('../../../../../share/configs/config')

const emailSenderUsers = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/02/2023
     * @description Send Email Warning hacker Take Refetch Token
     * @function sendEmailUserWarningHacker
     * @return { Object }
     */
    sendEmailUserWarningHacker: async (message) => {
        console.log(message.value)
        const option = {
            from: CONFIGS.SMTP_MAIL,
            to: message.value.email,
            subject: `Verify Your Email`,
            template: "warning_account_by_hacker",
            attachments: [
                {
                    filename: "logo.png",
                    path: path.resolve("./src/share/assets", "logo", "logo.png"),
                    cid: "image_logo",
                },
            ],
            context: {
                data: message.value,
            },
        }
        try {
            await send_email(option)
        } catch (error) {
            console.error('Lỗi khi gửi email:', error.message);
            await retry(send_email.bind(null, option), { retries: CONSTANTS.NUMBER_RETRY_EMAIL });
        }
    }
}
module.exports = emailSenderUsers;
