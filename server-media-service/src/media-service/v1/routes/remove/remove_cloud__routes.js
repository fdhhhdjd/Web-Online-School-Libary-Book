const router = require('express').Router();
const { removeCloudController } = require('../../controllers/remove.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 29/12/2022
 * @description Route remove image cloud
 */
router.post('/remove', removeCloudController.removeCloud);

module.exports = router;
