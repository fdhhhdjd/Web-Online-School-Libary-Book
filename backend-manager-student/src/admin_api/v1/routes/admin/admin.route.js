const router = require('express').Router();
const adminController = require('../../controllers/admin.controller');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @update_at 11/01/2023
 * @description Route login admin
 */
router.post('/login', adminController.LoginAdmin);
router.post('/add/student', adminController.AddStudent);

module.exports = router;
