//! SHARE
const { returnReasons } = require('../../../share/middlewares/handle_error');
const { handleUpload } = require('../../../share/services/upload.service');
const { handleRemoveTmp } = require('../../../share/services/remove_tmp.service');
const {
    handleResizeImage,
    handleValideResizeImage,
} = require('../../../share/services/resize_img_service');
const CONSTANTS = require('../../../share/configs/constants');
const MESSAGES = require('../../../share/configs/message');
const STORAGE = require('../../../share/utils/storage');
const HELPER = require('../../../share/utils/helper');

const uploadController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @update_at 12/01/2023, 15/03/2023, 23/03/2023
     * @description Upload image storage cloud
     * @function uploadCloudinary
     * @param { files }
     * @return {Object}
     */
    uploadCloudinary: async (req, res) => {
        // Check if req.files is null or undefined before accessing its properties
        if (!req.files || !req.files.file) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.MEDIA.NO_FILE_PROVIDED,
                },
            });
        }
        // Take auth middlaware
        const auth_general = req.auth_general.id;
        if (!auth_general) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.MEDIA.NO_FILE_AUTH_GENERATOR,
                },
            });
        }

        // Take file input
        // Get the file from the request
        const file = req.files;
        // Get the uploaded file
        const file_upload = file.file;
        // Get the temporary file path
        const path_image = file_upload.tempFilePath;
        // Get the file mimetype
        const mime_image = file_upload.mimetype;
        // Get the file name
        const name_image = file_upload.name;
        // Size image
        const size_image = file_upload.size;

        try {
            if (size_image > CONSTANTS.SIZE_IMAGE) {
                handleRemoveTmp(path_image);
                return res.status(CONSTANTS.HTTP.STATUS_4XX_PAYLOAD_TOO_LARGE).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_PAYLOAD_TOO_LARGE,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_PAYLOAD_TOO_LARGE),
                    element: {
                        result: MESSAGES.MEDIA.NO_SIZE_IMAGE_BIG,
                    },
                });
            }

            // Change type media
            const check_type = STORAGE.detectedFileType(mime_image);
            const name_image_new = STORAGE.removeFileExtension(name_image);
            const media_id = HELPER.createID(check_type);
            const date = new Date().getTime();

            // Check is type
            const is_type = (type) =>
                type !== CONSTANTS.MIME_IMAGE ||
                type !== CONSTANTS.MIME_VIDEO ||
                type !== CONSTANTS.MIME_AUDIO ||
                type !== CONSTANTS.MIME_DOCUMENT;

            if (!is_type(check_type)) {
                handleRemoveTmp(path_image);
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.MEDIA.NO_TYPE_INVALID,
                    },
                });
            }
            // Take tail file
            let template_upload;
            let cloud_bucket;
            switch (check_type) {
                // Check the media type and set the corresponding template_upload and cloud_bucket
                case CONSTANTS.MIME_IMAGE:
                    template_upload = CONSTANTS.STORAGE_FOLDER_IMAGES_TEMPLATE;
                    cloud_bucket = CONSTANTS.MIME_IMAGE;
                    break;
                case CONSTANTS.MIME_VIDEO:
                    template_upload = CONSTANTS.STORAGE_FOLDER_VIDEOS_TEMPLATE;
                    cloud_bucket = CONSTANTS.MIME_VIDEO;
                    break;
                case CONSTANTS.MIME_DOCUMENT:
                    template_upload = CONSTANTS.STORAGE_FOLDER_DOCUMENT_TEMPLATE;
                    cloud_bucket = CONSTANTS.MIME_DOCUMENT;
                    break;
                // In case of an invalid media type, return a 400 error
                default:
                    return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                        status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                        element: {
                            result: MESSAGES.MEDIA.NO_TYPE_INVALID,
                        },
                    });
            }

            // Link file
            const uri_key = STORAGE.getURIFromTemplate(template_upload, {
                user_id: auth_general,
                media_id,
                time: date,
                file_name: name_image_new,
            });

            // Upload cloud
            handleUpload(path_image, uri_key, cloud_bucket)
                .then((result) =>
                    res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                        status: CONSTANTS.HTTP.STATUS_2XX_OK,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                        element: {
                            result: {
                                public_id: result.public_id,
                                url: result.secure_url,
                            },
                        },
                    }),
                )
                .catch((error) => {
                    console.error(error);
                    return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                        status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    });
                });
        } catch (error) {
            console.error(error);
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
            });
        }
    },
};
module.exports.uploadController = uploadController;
