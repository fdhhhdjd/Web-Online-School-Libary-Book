const cloudinary = require('cloudinary');
const CONFIGS = require('../configs/config');

cloudinary.config({
    cloud_name: CONFIGS.CLOUD_NAME,
    api_key: CONFIGS.CLOUD_API_KEY,
    api_secret: CONFIGS.CLOUD_API_SECRET,
});
module.exports = cloudinary;
