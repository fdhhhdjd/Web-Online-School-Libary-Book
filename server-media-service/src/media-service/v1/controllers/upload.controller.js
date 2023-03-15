const { returnReasons } = require('../../../share/middlewares/handle_error');
const { handleUpload } = require('../../../share/services/upload.service');
const { handleRemoveTmp } = require('../../../share/services/remove_tmp.service');
const CONSTANTS = require('../../../share/configs/constants');
const STORAGE = require('../../../share/utils/storage');
const HELPER = require('../../../share/utils/helper');

const uploadController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @update_at 12/01/2023, 15/03/2023
     * @description Upload image storage cloud
     * @function uploadCloudinary
     * @param { files }
     * @return {Object}
     */
    uploadCloudinary: async (req, res) => {
        try {
            // Take auth middlaware
            const auth_general = req.auth_general.id;
            if (!auth_general) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            // Take file input
            const file = req.files;
            const file_upload = file.file;
            const path_image = file_upload.tempFilePath;
            const size_image = file_upload.size;
            const mime_image = file_upload.mimetype;
            const name_image = file_upload.name;

            //Check input invalid
            if (!file || Object.keys(file).length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            //Check size image
            if (size_image > CONSTANTS.SIZE_IMAGE) {
                handleRemoveTmp(path_image);
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Image size is too big!'
                    }
                });
            }

            // Change type media
            const check_type = STORAGE.detectedFileType(mime_image);
            const name_image_new = STORAGE.removeFileExtension(name_image);
            const media_id = HELPER.createID(check_type);
            const date = new Date().getTime();

            //Check is type 
            const is_type = (type) =>
                type !== CONSTANTS.MIME_IMAGE ||
                type !== CONSTANTS.MIME_VIDEO ||
                type !== CONSTANTS.MIME_AUDIO ||
                type !== CONSTANTS.MIME_DOCUMENT;

            if (!is_type(check_type)) {
                handleRemoveTmp(path_image);
                return {
                    status: 415,
                    message: returnReasons('415'),
                    element: {
                        result: 'Type media Invalid !'
                    }
                };
            }

            //Take tail file
            let template_upload;
            let cloud_bucket;
            switch (check_type) {
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
                default:
                    return res.status(400).json({
                        status: 400,
                        message: returnReasons('400'),
                        element: {
                            result: 'Type media Invalid !'
                        }
                    });
            }

            // Link file
            const uri_key = STORAGE.getURIFromTemplate(template_upload, {
                user_id: auth_general,
                file_name: name_image_new,
                time: date,
                media_id,
            });

            //Upload cloud
            await handleUpload(path_image, uri_key, cloud_bucket)
                .then((result) =>
                    res.status(200).json({
                        status: 200,
                        message: returnReasons('200'),
                        element: {
                            public_id: result.public_id,
                            url: result.secure_url,
                        },
                    }),
                )
                .catch((error) => {
                    console.error(error);
                    return res.status(500).json({
                        status: 500,
                        message: returnReasons('500'),
                    });
                });
        } catch (error) {
            console.error(error);
            return res.status(503).json({
                status: 503,
                element: returnReasons('503'),
            });
        }
    },
};
module.exports.uploadController = uploadController;
