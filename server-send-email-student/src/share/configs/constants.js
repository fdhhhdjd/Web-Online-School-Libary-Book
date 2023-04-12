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
    _1_MINUTES: 60 * 1000,
    _5_MINUTES: 5 * 60 * 1000,
    _1_DAY: 24 * 60 * 60 * 1000,
    _1_DAY_S: 24 * 60 * 60,
    _1_HOURS_S: 60 * 60,
    _1_YEAR: 365 * 24 * 60 * 60 * 1000,
    _1_MONTH: 30 * 24 * 60 * 60 * 1000,
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 19/02/2023
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
    * @created_at 19/02/2023
    * @description Key Redis General
    * @param { String }
    */
    // Student
    KEY_USER_EXIT_U: 'u*',
    KEY_USER_WARNING_TOKEN: 'user_send_email_warning_token',
    KEY_USER_LINK_RESET_PASSWORD: 'user_link_reset_password',
    KEY_USER_LINK_VERIFICATION: 'user_check_link_email',
    // Admin
    KEY_ADMIN_EXIT_A: 'a*',
    KEY_ADMIN_WARNING_TOKEN: 'admin_send_email_warning_token',

    // MEDIA
    KEY_MEDIA_EXIT_M: 'm*',

    // CRON
    KEY_CRON_EXIT_C: 'c*',

    // DB
    KEY_CRON_EXIT_DB: 'db*',

    // SERVER ALL
    KEY_SERVER: {
        REDIS_SERVER_ADMIN: 'admin_unErrorServer',
        REDIS_SERVER_STUDENT: 'user_unErrorServer',
        REDIS_SERVER_MEDIA: 'media_unErrorServer',
        REDIS_SERVER_CRON: 'cron_unErrorServer',
        REDIS_DB: 'db_fail',
    },
    /**
   * @author Nguyễn Tiến Tài
   * @created_at 19/02/2023
   * @description Number retry
   * @param { Number }
   */
    NUMBER_RETRY_EMAIL: 3,
    /**
* @author Nguyễn Tiến Tài
* @created_at 23/02/2023
* @description Type Folder Email
* @param {Number}
*/
    TYPE_STUDENT: 0,
    TYPE_ADMIN: 1,
    STUDENT_FOLDER: 'user_views',
    ADMIN_FOLDER: 'admin_views',
    PATH_FOLDER_U_A: './src/share/views/${folder_u_a}',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description environment
     */
    ENVIRONMENT_DEV: 'DEVELOPER',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description environment
     */
    THRESHOLD: 100 * 1000,
    LEVEL: 6,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/03/2023
     * @description ERROR CRASH SERVER
     */
    ERROR_REJECTION: 'unhandledRejection',
    ERROR_EXCEPTION: 'uncaughtException',
    SIGINT: 'SIGINT',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 30/03/2023
     * @description NAME_SERVER
     */
    NAME_SERVER: {
        SEND_EMAIL: 'SEND_EMAIL',
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 30/03/2023
     * @description STRING_SERVER
     */
    STRING_SERVER: {
        URL: 'Server ${name} ${port}:: ${errorName}: ${errorMessage}',
    },
};
