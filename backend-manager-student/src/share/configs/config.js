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
     * @created_at 06/01/2023
     * @description REDIS SLAVE Settings
     */
    REDIS_PORT_SLAVE: process.env.REDIS_PORT_SLAVE,
    REDIS_HOST_SLAVE: process.env.REDIS_HOST_SLAVE,
    REDIS_USER_SLAVE: process.env.REDIS_USER_SLAVE,
    REDIS_PASSWORD_SLAVE: process.env.REDIS_PASSWORD_SLAVE,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 11/01/2023
     * @description Limit data Settings
     */
    MAX_LRU: process.env.MAX_LRU,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/01/2023
     * @description KEY PHONE
     */
    ACCOUNT_SID_KEY: process.env.ACCOUNT_SID_KEY,
    AUTH_TOKEN_KEY: process.env.AUTH_TOKEN_KEY,
};
