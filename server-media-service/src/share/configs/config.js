/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/12/2022
 * @description File Configs General
 * @param { "Name":process.env."name" => Example: PORT:process.env.PORT}
 */
module.exports = {
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
};
