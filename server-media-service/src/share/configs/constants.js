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
};
