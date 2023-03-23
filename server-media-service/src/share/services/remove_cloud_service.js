//! DATABASE
const cloudinary_db = require('../db/cloudinary_db');

module.exports = {
    /**
    * @author Nguyễn Tiến Tài
    * @created_at 20/03/2022
    * @description removeStorage
    * @function removeStorage
    * @param { public_id }
    * @return {string}
    */
    // Function to remove a file from cloud storage
    removeStorage: async (public_id) => {
        try {
            // Call the cloudinary API to delete the file using its public_id
            const result = await new Promise((resolve, reject) => {
                cloudinary_db.v2.uploader.destroy(public_id, (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                });
            });
            return result;
        } catch (error) {
            throw error;
        }
    },
};
