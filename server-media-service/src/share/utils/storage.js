const path = require('path')

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
        const images = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const videos = [
            'video/mp4',
            'video/3gp',
            'video/ogg',
            'video/x-msvideo',
            'video/quicktime',
        ];
        const documents = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ];
        const audio = ['audio/aac', 'audio/mpeg', 'audio/ogg', 'audio/wav'];

        if (images.includes(content_type)) {
            return 'image';
        }

        if (videos.includes(content_type)) {
            return 'video';
        }

        if (documents.includes(content_type)) {
            return 'document';
        }

        if (audio.includes(content_type)) {
            return 'audio';
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
        return path.basename(your_file_path, path.extname(your_file_path))
    },
    /**
   * @author Nguyễn Tiến Tài
     * @created_at 12/01/2023
   * 
   * @description from String template to URI
   * @param {object} data or {string} template
   * @returns {string}
   */
    getURIFromTemplate(template, data) {
        const { user_id, id, file_name, slug, time, extension, media_id } = data
        return eval('`' + template.replace(/`/g, '\\`') + '`');
    },

};
