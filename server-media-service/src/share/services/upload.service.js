const cloudinary_db = require('../db/cloudinary_db');
const { handleRemoveTmp } = require('./remove_tmp.service');

module.exports = {
    handleUpload: async (path_image) => {
        let data = null;
        await cloudinary_db.v2.uploader.upload(
            path_image,
            { folder: 'libary_school' },
            async (err, result) => {
                if (err) throw (data = err);
                handleRemoveTmp(path_image);
                return (data = result);
            },
        );
        return data;
    },
};
