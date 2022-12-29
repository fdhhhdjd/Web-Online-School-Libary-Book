const { returnReasons } = require('../../../share/middlewares/handle_error');
const { handleUpload } = require('../../../share/services/upload.service');
const { handleRemoveTmp } = require('../../../share/services/remove_tmp.service');
const CONSTANTS = require('../../../share/configs/constants');
const STORAGE = require('../../../share/utils/storage');

const uploadController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @description Upload image storage cloud
     * @function uploadCloudinary
     * @param { files }
     * @return {Object}
     */
    uploadCloudinary: async (req, res) => {
        try {
            const file = req.files;
            const file_upload = file.file;
            const path_image = file_upload.tempFilePath;
            const size_image = file_upload.size;
            const mime_image = file_upload.mimetype;
            if (!file || Object.keys(file).length === 0) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }
            if (size_image > CONSTANTS.SIZE_IMAGE) {
                handleRemoveTmp(path_image);
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                });
            }

            const check_type = STORAGE.detectedFileType(mime_image);
            const is_type = (type) =>
                type !== CONSTANTS.MIME_IMAGE ||
                type !== CONSTANTS.MIME_VIDEO ||
                type !== CONSTANTS.MIME_AUDIO;

            if (!is_type(check_type)) {
                handleRemoveTmp(path_image);
                return {
                    status: 415,
                    message: returnReasons('415'),
                };
            }
            await handleUpload(path_image)
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
