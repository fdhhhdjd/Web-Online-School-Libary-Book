const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const accessStudentMiddleware = require('../../../../share/middleware/access.student.middleware');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @description Route Login Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/login', userController.loginStudent);
/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/02/2023
 * @description Route renew-token token
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/renew-token', userController.reNewToken);
/**
 * @author Nguyễn Tiến Tài
 * @created_at 05/02/2023
 * @description Route logout Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/logout', accessStudentMiddleware, userController.logoutStudent);
/**
 * @author Nguyễn Tiến Tài
 * @created_at 06/02/2023
 * @description Route get profile Student
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/profile', accessStudentMiddleware, userController.getProfileStudent);
/**
 * @author Nguyễn Tiến Tài
 * @created_at 13/02/2023
 * @description Route change password Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/change-password', accessStudentMiddleware, userController.changePasswordStudent);
/**
 * @author Nguyễn Tiến Tài
 * @created_at 13/02/2023
 * @description Route check password Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/check-password', accessStudentMiddleware, userController.checkPasswordStudent);

module.exports = router;
