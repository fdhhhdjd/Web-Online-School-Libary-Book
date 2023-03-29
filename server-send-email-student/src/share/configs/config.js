/**
 * @author Nguyễn Tiến Tài
 * @created_at 16/12/2022
 * @description File Configs General
 * @param { "Name":process.env."name" => Example: PORT:process.env.PORT}
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 16/12/2022
     * @description SMTP Settings
     */
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_SERVICE: process.env.SMTP_SERVICE,
    SMTP_MAIL: process.env.SMTP_MAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 16/12/2022
     * @description REDIS Settings
     */
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_USER: process.env.REDIS_USER,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description ENVIRONMENT
     */
    NODE_ENV: process.env.NODE_ENV,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/03/2023
     * @description CONNECT TELEGRAM
     */
    KEY_TELEGRAM: process.env.KEY_TELEGRAM,
    KEY_CHAT_ID: process.env.KEY_CHAT_ID,
};
