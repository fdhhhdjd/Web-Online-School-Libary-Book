//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const userController = require('../../controllers/user.controllers/user.controller');

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
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/renew-token', userController.reNewToken);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 23/02/2023
 * @description Route forget password Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/forget-password', userController.forgetPasswordStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 23/02/2023
 * @description Route forget password Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/reset/:token_reset', userController.resetPasswordStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 27/02/2023
 * @description Route update verification email
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/email/:user_id/:uniqueString', userController.updateVerificationEmailStudent);

module.exports = router;
