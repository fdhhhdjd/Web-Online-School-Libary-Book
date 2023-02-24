const cloudinary_db = require('../db/cloudinary_db');
const { handleRemoveTmp } = require('./remove_tmp.service');
const CONSTANTS = require('../../share/configs/constants');
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @update_at 12/01/2023
     * @description Upload storage cloud
     * @function handleUpload
     * @param { path_image, name_image }
     * @return {data}
     */
    handleUpload: async (path_image, name_image, cloud_bucket) => {
        let data = null;
        await cloudinary_db.v2.uploader.upload(
            path_image,
            cloud_bucket === CONSTANTS.MIME_DOCUMENT
                ? {
                      resource_type: CONSTANTS.OPTION_CLOUD,
                      folder: CONSTANTS.OPTION_FOLDER_DOCUMENT,
                      public_id: `${name_image}`,
                      format: CONSTANTS.OPTION_CLOUD_DOCUMENT_FORMAT,
                  }
                : {
                      resource_type: CONSTANTS.OPTION_CLOUD,
                      folder: CONSTANTS.OPTION_FOLDER_IMAGE,
                      public_id: `${name_image}`,
                  },
            async (err, result) => {
                if (err) throw (data = err);
                handleRemoveTmp(path_image);
                return (data = result);
            },
        );
        return data;
    },
};
