const cloudinary = require('cloudinary');
const CONFIGS = require('../configs/config');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 22/01/2023
 * @description Connect Cloud
 */

cloudinary.config({
    cloud_name: CONFIGS.CLOUD_NAME,
    api_key: CONFIGS.CLOUD_API_KEY,
    api_secret: CONFIGS.CLOUD_API_SECRET,
});
module.exports = cloudinary;
