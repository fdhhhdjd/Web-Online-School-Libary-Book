//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const userController = require('../../controllers/user.controller');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 05/02/2023
 * @description Route logout Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/logout', userController.logoutStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 06/02/2023
 * @description Route get profile Student
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/profile', userController.getProfileStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 13/02/2023
 * @description Route change password Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/change-password', userController.changePasswordStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 13/02/2023
 * @description Route check password Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/check-password', userController.checkPasswordStudent);

module.exports = router;
