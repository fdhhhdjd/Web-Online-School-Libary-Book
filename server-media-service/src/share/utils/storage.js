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
};
