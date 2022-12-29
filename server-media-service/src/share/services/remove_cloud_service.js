const cloudinary_db = require('../db/cloudinary_db');

module.exports = {
    removeStorage: async (public_id) => {
        let results = null;
        await cloudinary_db.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw (results = err);
            results = result;
        });
        return results;
    },
};
