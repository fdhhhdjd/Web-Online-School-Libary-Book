//! LIBRARY
const sharp = require('sharp');

//! SHARE
const STORAGE = require('../utils/storage');
const CONSTANTS = require('../configs/constants');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/03/2023
     * @description resize image
     * @function resizeImage
     * @param { path_image }
     * @return {string}
     */
    handleResizeImage: async (path_image) => {
        // Link file
        const path_image_convert = STORAGE.getURIFromTemplate(CONSTANTS.PATH_RESIZE, {
            path_image,
        });
        await sharp(path_image).resize(1024, 764).toFile(path_image_convert);
        // Update the temporary file path to the resized image
        return path_image_convert;
    },
    handleValidResizeImage: async (path_image) => await sharp(path_image).metadata().size,
};
