/* eslint-disable no-template-curly-in-string */
/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/12/2022
 * @description File Constants General
 * @param { "Name":"value" => Example: Male: 1 }
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/12/2022
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
     * @created_at 28/12/2022
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
     * @created_at 23/03/2023
     * @description All status code
     */
    HTTP: {
        // 1xx
        STATUS_1XX_CONTINUE: 100,
        STATUS_1XX_SWITCHING_PROTOCOLS: 101,
        STATUS_1XX_PROCESSING: 102,
        STATUS_1XX_EARLY_HINTS: 103,
        // 2xx
        STATUS_2XX_OK: 200,
        STATUS_2XX_CREATED: 201,
        STATUS_2XX_ACCEPTED: 202,
        STATUS_2XX_NON_AUTHORITATIVE_INFORMATION: 203,
        STATUS_2XX_NO_CONTENT: 204,
        STATUS_2XX_RESET_CONTENT: 205,
        STATUS_2XX_PARTIAL_CONTENT: 206,
        STATUS_2XX_MULTI_STATUS: 207,
        STATUS_2XX_ALREADY_REPORTED: 208,
        STATUS_2XX_IM_USED: 226,
        // 3xx
        STATUS_3XX_MULTIPLE_CHOICES: 300,
        STATUS_3XX_MOVED_PERMANENTLY: 301,
        STATUS_3XX_FOUND: 302,
        STATUS_3XX_SEE_OTHER: 303,
        STATUS_3XX_NOT_MODIFIED: 304,
        STATUS_3XX_USE_PROXY: 305,
        STATUS_3XX_TEMPORARY_REDIRECT: 307,
        STATUS_3XX_PERMANENT_REDIRECT: 308,
        // 4xx
        STATUS_4XX_BAD_REQUEST: 400,
        STATUS_4XX_UNAUTHORIZED: 401,
        STATUS_4XX_PAYMENT_REQUIRED: 402,
        STATUS_4XX_FORBIDDEN: 403,
        STATUS_4XX_NOT_FOUND: 404,
        STATUS_4XX_METHOD_NOT_ALLOWED: 405,
        STATUS_4XX_NOT_ACCEPTABLE: 406,
        STATUS_4XX_PROXY_AUTHENTICATION_REQUIRED: 407,
        STATUS_4XX_REQUEST_TIMEOUT: 408,
        STATUS_4XX_CONFLICT: 409,
        STATUS_4XX_GONE: 410,
        STATUS_4XX_LENGTH_REQUIRED: 411,
        STATUS_4XX_PRECONDITION_FAILED: 412,
        STATUS_4XX_PAYLOAD_TOO_LARGE: 413,
        STATUS_4XX_TOO_MANY_REQUESTS: 429,
        STATUS_4XX_REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
        STATUS_4XX_UNAVAILABLE_FOR_LEGAL_REASONS: 451,
        // 5xx
        STATUS_5XX_INTERNAL_SERVER_ERROR: 500,
        STATUS_5XX_NOT_IMPLEMENTED: 501,
        STATUS_5XX_BAD_GATEWAY: 502,
        STATUS_5XX_SERVICE_UNAVAILABLE: 503,
        STATUS_5XX_GATEWAY_TIMEOUT: 504,
        STATUS_5XX_HTTP_VERSION_NOT_SUPPORTED: 505,
        STATUS_5XX_VARIANT_ALSO_NEGOTIATES: 506,
        STATUS_5XX_INSUFFICIENT_STORAGE: 507,
        STATUS_5XX_LOOP_DETECTED: 508,
        STATUS_5XX_BANDWIDTH_LIMIT_EXCEEDED: 509,
        STATUS_5XX_NOT_EXTENDED: 510,
        STATUS_5XX_NETWORK_AUTHENTICATION_REQUIRED: 511,

        // Not Status
        NO_STATUS_DEFAULT: 'default',
    },

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @description size image
     * @param { "size"}
     */
    SIZE_IMAGE: 1024 * 1024,

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @description mime
     * @param { "mime"}
     */
    MIME_IMAGE: 'image',
    MIME_VIDEO: 'video',
    MIME_AUDIO: 'audio',
    MIME_DOCUMENT: 'document',
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 12/01/2023
    * @description storage
    * @param { user_id,time,file_name}
    */
    STORAGE_FOLDER_VIDEOS_TEMPLATE: 'videos/${user_id}/${media_id}/${time}-${file_name}',
    STORAGE_FOLDER_IMAGES_TEMPLATE: 'images/${user_id}/${media_id}/${time}-${file_name}',
    STORAGE_FOLDER_AUDIO_TEMPLATE: 'audio/${user_id}/${media_id}/${time}-${file_name}',
    STORAGE_FOLDER_DOCUMENT_TEMPLATE: 'document/${user_id}/${media_id}/${time}-${file_name}',
    STORAGE_UPLOAD_ID: 'data/${id}/origin/${file_name}',
    /**
   * @author Nguyễn Tiến Tài
   * @created_at 30/01/2023
   * @description option
   */
    OPTION_CLOUD: 'auto',
    OPTION_CLOUD_DOCUMENT_FORMAT: 'xlsx',
    OPTION_FOLDER_IMAGE: 'library_school_image',
    OPTION_FOLDER_DOCUMENT: 'library_school_document',
    /**
  * @author Nguyễn Tiến Tài
  * @created_at 31/01/2023
  * @description proxy accept proxy reliable
  */
    TRUST_PROXY: 'trust proxy',

    /**
 * @author Nguyễn Tiến Tài
 * @created_at 31/01/2023
 * @description environment
 */
    ENVIRONMENT_PRODUCT: 'PRODUCTION',
    ENVIRONMENT_DEV: 'DEVELOPER',
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
    URL_MEDIA_SWAGGER: 'http://localhost:8000',
    TITLE_MEDIA_SWAGGER: 'Document Media API',
    DESCRIPTION_MEDIA_SWAGGER: 'Document API Library School',
    APIS_MEDIA_SWAGGER: './src/media-service/v1/Swagger/*/*.yaml',
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 03/01/2023
    * @description Key all redis
    */
    KEY_BACK_LIST: 'black_list_token',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2023
     * @description Name DB
     */
    CLIENT_PG: 'pg',

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description Resize
     */
    PATH_RESIZE: '${path_image}_resized',

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description DELETE FLAG
     */
    DELETED_ENABLE: true,
    DELETED_DISABLE: false,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description NAME HEADER
     */
    DEVICE_ID: 'X-DEVICE-ID',
    OS_TYPE: 'X-OS-TYPE',
    OS_VERSION: 'X-OS-VERSION',
    APP_VERSION: 'X-APP-VERSION',
    DEVICE_NAME: 'X-DEVICE-NAME',
    HEADER_EMPTY: '',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description TYPE MEDIA
     */
    TYPE: {
        IMAGE: {
            JPEG: 'image/jpeg',
            PNG: 'image/png',
            GIF: 'image/gif',
            WEBP: 'image/webp',
        },
        VIDEO: {
            MP4: 'video/mp4',
            _3PG: 'video/3gp',
            OGG: 'video/ogg',
            X_MS_VIDEO: 'video/x-msvideo',
            QUICK_TIME: 'video/quicktime',
        },
        DOCUMENT: {
            PDF: 'application/pdf',
            MS_WORD: 'application/msword',
            DOCUMENT: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            SHEET: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        AUDIO: {
            ACC: 'audio/aac',
            MPEG: 'audio/mpeg',
            OGG: 'audio/ogg',
            WAV: 'audio/wav',
        },
    },

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
     * @description KEY QUEUE
     */
    QUEUE: {
        REDIS_SERVER_MEDIA: 'media_unErrorServer',
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 30/03/2023
     * @description NAME_SERVER
     */
    NAME_SERVER: {
        MEDIA: 'media',
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
