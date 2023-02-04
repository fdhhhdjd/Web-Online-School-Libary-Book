const router = require('express').Router();
const userController = require('../../controllers/user.controller');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @description Route Login Student
 */
router.post('/login', userController.LoginStudent);

module.exports = router;
