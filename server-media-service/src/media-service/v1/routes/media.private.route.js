//! LIBARY
const router = require('express').Router();

//! CONTROLLER UPLOAD
const { uploadController } = require('../../v1/controllers/upload.controller');
const { removeCloudController } = require('../../v1/controllers/remove.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 29/12/2022
 * @updated_at 03/01/2022
 * @description Route upload image cloud
 */
router.post('/upload', uploadController.uploadCloudinary);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 29/12/2022
 * @updated_at 03/01/2022
 * @description Route remove image cloud
 */
router.post('/remove', removeCloudController.removeCloud);

module.exports = router;
