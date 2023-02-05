const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const accessStudentMiddleware = require('../../../../share/middleware/access.student.middleware');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @description Route Login Student
 */
router.post('/login', userController.loginStudent);
/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/02/2023
 * @description Route renew-token token
 */
router.post('/renew-token', userController.reNewToken);
/**
 * @author Nguyễn Tiến Tài
 * @created_at 05/02/2023
 * @description Route logout Student
 */
router.post('/logout', accessStudentMiddleware, userController.logoutStudent);

module.exports = router;
