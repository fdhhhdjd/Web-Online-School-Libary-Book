const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @description Route login admin
 */
router.post('/login', adminController.LoginAdmin);

module.exports = router;
