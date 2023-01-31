/**
 * @author Nguyễn Tiến Tài
 * @created_at 16/12/2022
 * @description File Constants General
 * @param { "Name":"value" => Example: Male: 1 }
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 16/12/2022
     * @description Milisecond / Second
     * @param { "Name":"value" => Example: Male: 1 }
     */
    _30_SECONDS: 30 * 1000,
    _1_MINUTES: 60 * 1000,
    _5_MINUTES: 5 * 60 * 1000,
    _1_DAY: 24 * 60 * 60 * 1000,
    _1_DAY_S: 24 * 60 * 60,
    _1_HOURS_S: 60 * 60,
    _1_YEAR: 365 * 24 * 60 * 60 * 1000,
    _1_MONTH: 30 * 24 * 60 * 60 * 1000,

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 16/12/2022
     * @description Time cron
     */
    _5_SECONDS_CRON: '*/5 * * * *',

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
     * @description Error general
     * @param { "Name":"message" }
     */
    reasonPhraseCodeProNewMap: () => {
        const result = new Map([
            ['100', 'Continue'],
            ['101', 'Switching Protocols'],
            ['102', 'Processing'],
            ['103', 'Early Hints'],
            ['200', 'OK'],
            ['201', 'Created'],
            ['202', 'Accepted'],
            ['203', 'Non-Authoritative Information'],
            ['204', 'No Content'],
            ['205', 'Reset Content'],
            ['206', 'Partial Content'],
            ['207', 'Multi-Status'],
            ['208', 'Already Reported'],
            ['226', 'IM Used'],
            ['300', 'Multiple Choices'],
            ['301', 'Moved Permanently'],
            ['302', 'Found'],
            ['303', 'See Other'],
            ['304', 'Not Modified'],
            ['305', 'Use Proxy'],
            ['307', 'Temporary Redirect'],
            ['308', 'Permanent Redirect'],
            ['400', 'Bad Request'],
            ['401', 'Unauthorized'],
            ['402', 'Payment Required'],
            ['403', 'Forbidden'],
            ['404', 'Not Found'],
            ['405', 'Method Not Allowed'],
            ['406', 'Not Acceptable'],
            ['407', 'Proxy Authentication Required'],
            ['408', 'Request Timeout'],
            ['409', 'Conflict'],
            ['410', 'Gone'],
            ['411', 'Length Required'],
            ['412', 'Precondition Failed'],
            ['413', 'Payload Too Large'],
            ['414', 'URI Too Long'],
            ['415', 'Unsupported Media Type'],
            ['416', 'Range Not Satisfiable'],
            ['417', 'Expectation Failed'],
            ['418', "I'm a Teapot"],
            ['421', 'Misdirected Request'],
            ['422', 'Unprocessable Entity'],
            ['423', 'Locked'],
            ['424', 'Failed Dependency'],
            ['425', 'Too Early'],
            ['426', 'Upgrade Required'],
            ['428', 'Precondition Required'],
            ['429', 'Too Many Requests'],
            ['431', 'Request Header Fields Too Large'],
            ['451', 'Unavailable For Legal Reasons'],
            ['500', 'Internal Server Error'],
            ['501', 'Not Implemented'],
            ['502', 'Bad Gateway'],
            ['503', 'Service Unavailable'],
            ['504', 'Gateway Timeout'],
            ['505', 'HTTP Version Not Supported'],
            ['506', 'Variant Also Negotiates'],
            ['507', 'Insufficient Storage'],
            ['508', 'Loop Detected'],
            ['509', 'Bandwidth Limit Exceeded'],
            ['510', 'Not Extended'],
            ['511', 'Network Authentication Required'],
            ['default', 'No code'],
        ]);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/01/2023
     * @description mobile code
     * @param { "Name":"message" }
     */
    mobileCodeProNewMap: () => {
        const result = new Map([
            ['01', 'MobiFone'],
            ['02', 'Vinaphone'],
            ['03', 'S-Fone'],
            ['04', 'Viettel Mobile'],
            ['05', 'Vietnamobile'],
            ['06', 'E-Mobile'],
            ['07', 'Beeline VN'],
            ['default', 'No code'],
        ]);
        return result;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 19/01/2023
     * @description mobile network
     */
    _COUNTRY_CODE: 'VN',
    _SERVICE_PROVIDER: 'carrier',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
     * @description environment
     */
    ENVIRONMENT_PRODUCT: 'PRODUCTION',
    ENVIRONMENT_DEV: 'DEVELOPER',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
     * @description Name DB
     */
    CLIENT_PG: 'pg',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/01/2023
     * @description sony random id
     */
    DETERMINED_COMPUTER: 2,
    TIME_START_SYSTEMS: Date.UTC(2020, 4, 18, 0, 0, 0), // timestamp tránh trùng lặp ID hệ thống
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 30/01/2023
     * @description Setup Swagger general
     */
    OPEN_API_SWAGGER: '3.0.0',
    VERSION_SWAGGER: '1.0.0',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 30/01/2023
     * @description Setup Swagger admin
     */
    URL_ADMIN_SWAGGER: 'http://localhost:5000',
    TITLE_ADMIN_SWAGGER: 'Document Admin API',
    DESCRIPTION_ADMIN_SWAGGER: 'Document API Library School',
    APIS_ADMIN_SWAGGER: './src/admin_api/v1/Swagger/*/*.yaml',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 31/01/2023
     * @description Setup Swagger user
     */
    URL_USER_SWAGGER: 'http://localhost:5001',
    TITLE_USER_SWAGGER: 'Document User API',
    DESCRIPTION_USER_SWAGGER: 'Document API Library School',
    APIS_USER_SWAGGER: './src/user_api/v1/Swagger/*/*.yaml',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 31/01/2023
     * @description proxy accept proxy reliable
     */
    TRUST_PROXY: 'trust proxy',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 31/01/2023
     * @description compression zip send server
     */
    COMPRESSION_ZIP_SEND_SERVER_LEVER: 6,
    COMPRESSION_ZIP_SEND_THRESHOLD: 100 * 1000,
    COMPRESSION_ZIP_SEND_SERVER: 'x-no-compression',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 31/01/2023
     * @description read document
     */
    RESPONSE_TYPE: 'arraybuffer',
};
