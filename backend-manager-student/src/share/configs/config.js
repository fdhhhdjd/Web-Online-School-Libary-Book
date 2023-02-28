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
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2023
     * @description INFO CONNECT DB
     */
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2023
     * @description MAX MIN CONNECT DB
     */
    POSTGRES_CONNECT_MIN: process.env.POSTGRES_CONNECT_MIN,
    POSTGRES_CONNECT_MAX: process.env.POSTGRES_CONNECT_MAX,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2023
     * @description ENVIRONMENT
     */
    NODE_ENV: process.env.NODE_ENV,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/01/2023
     * @description OPTION OTP
     */
    ALGORITHM_OTP_OPTION: process.env.ALGORITHM_OTP_OPTION,
    CUSTOM_SEED_OTP_OPTION: process.env.CUSTOM_SEED_OTP_OPTION,
    RANDOM_NUMBER_OTP: process.env.RANDOM_NUMBER_OTP,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description KEY_SESSION
     */
    KEY_SESSION: process.env.KEY_SESSION,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description KEY_SESSION
     */
    KEY_COOKIE: process.env.KEY_COOKIE,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description KEY Refetch Token
     */
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    EXPIRES_REFRESH_TOKEN: process.env.EXPIRES_REFRESH_TOKEN,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description KEY Accept Token
     */
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    EXPIRES_ACCESS_TOKEN: process.env.EXPIRES_ACCESS_TOKEN,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description KEY Accept Token
     */
    IP_ADMIN: process.env.IP_ADMIN,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/02/2023
     * @description PORT_FRONTEND_DEV
     */
    PORT_FRONTEND_LOCAL: process.env.FRONTEND_URL,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/02/2023
     * @description Public Private Key Token
     */
    ALGORITHM_TOKEN: process.env.ALGORITHM_TOKEN,
    ENCODE_PEM: process.env.ENCODE_PEM,
    TYPE_PEM: process.env.TYPE_PEM,
    MODULUSLENGTH: process.env.MODULUSLENGTH,
    GENERAL_KEY_RANDOM: process.env.GENERAL_KEY_RANDOM,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/02/2023
     * @description Limit request
     */
    IPA_API_RATE_LIMIT_DURATION: process.env.IPA_API_RATE_LIMIT_DURATION,
    IPA_API_RATE_LIMIT: process.env.IPA_API_RATE_LIMIT,
};
