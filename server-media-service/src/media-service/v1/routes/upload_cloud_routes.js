const router = require('express').Router();
const { uploadController } = require('../controllers/upload.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 29/12/2022
 * @description Route upload image cloud
 */
router.post('/upload', uploadController.uploadCloudinary);

module.exports = router;
