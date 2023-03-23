//! LIBRARY
const path = require('path');

//! SHARE
const REGEX = require('../configs/regex');
const CONSTANTS = require('../configs/constants');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 29/12/2022
 * @description File Storage General
 */
module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 29/12/2022
     * @description content type image
     * @param { string:content_type }
     */
    detectedFileType(content_type) {
        const fileTypes = {
            image: [
                CONSTANTS.TYPE.IMAGE.JPEG,
                CONSTANTS.TYPE.IMAGE.PNG,
                CONSTANTS.TYPE.IMAGE.GIF,
                CONSTANTS.TYPE.IMAGE.WEBP,
            ],
            video: [
                CONSTANTS.TYPE.VIDEO.MP4,
                CONSTANTS.TYPE.VIDEO._3PG,
                CONSTANTS.TYPE.VIDEO.OGG,
                CONSTANTS.TYPE.VIDEO.X_MS_VIDEO,
                CONSTANTS.TYPE.VIDEO.QUICK_TIME,
            ],
            document: [
                CONSTANTS.TYPE.DOCUMENT.PDF,
                CONSTANTS.TYPE.DOCUMENT.MS_WORD,
                CONSTANTS.TYPE.DOCUMENT.DOCUMENT,
                CONSTANTS.TYPE.DOCUMENT.SHEET,
            ],
            audio: [
                CONSTANTS.TYPE.AUDIO.ACC,
                CONSTANTS.TYPE.AUDIO.MPEG,
                CONSTANTS.TYPE.AUDIO.OGG,
                CONSTANTS.TYPE.AUDIO.WAV,
            ],
        };

        for (const fileType in fileTypes) {
            if (fileTypes[fileType].includes(content_type)) {
                return fileType;
            }
        }

        // not found return null
        return null;
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
     * @description remove mime type
     * @param { string }
     */
    removeFileExtension(your_file_path) {
        return path.basename(your_file_path, path.extname(your_file_path));
    },
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 12/01/2023
    * @description from String template to URI
    * @param {object} data or {string} template
    * @returns {string}
    */
    getURIFromTemplate(template, data) {
        return template.replace(REGEX.REGEX_TEMPLATE_STRING, (_, key) => data[key]);
    },
};
