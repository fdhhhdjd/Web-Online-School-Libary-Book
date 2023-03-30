/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/12/2022
 * @description File Configs General
 * @param { "Name":process.env."name" => Example: PORT:process.env.PORT}
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 30/03/2023
     * @description PORT MEDIA
     */
    PORT_MEDIA: process.env.PORT_MEDIA,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/12/2022
     * @description Cloundinary
     */
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @description Limit request
     */
    IPA_API_RATE_LIMIT_DURATION: process.env.IPA_API_RATE_LIMIT_DURATION,
    IPA_API_RATE_LIMIT: process.env.IPA_API_RATE_LIMIT,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 31/01/2023
     * @description ENVIRONMENT
     */
    NODE_ENV: process.env.NODE_ENV,
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 28/02/2023
    * @description INFO CONNECT DB
    */
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/02/2023
     * @description MAX MIN CONNECT DB
     */
    POSTGRES_CONNECT_MIN: process.env.POSTGRES_CONNECT_MIN,
    POSTGRES_CONNECT_MAX: process.env.POSTGRES_CONNECT_MAX,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/02/2023
     * @description REDIS Settings
     */
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_USER: process.env.REDIS_USER,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 03/01/2023
    * @description Public Private Key Token
    */
    ALGORITHM_TOKEN: process.env.ALGORITHM_TOKEN,
    ENCODE_PEM: process.env.ENCODE_PEM,
    TYPE_PEM: process.env.TYPE_PEM,
    MODULUSLENGTH: process.env.MODULUSLENGTH,
    GENERAL_KEY_RANDOM: process.env.GENERAL_KEY_RANDOM,
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 23/03/2023
    * @description MachineNo
    */
    MACHINE_NO: process.env.MACHINE_NO,
};
