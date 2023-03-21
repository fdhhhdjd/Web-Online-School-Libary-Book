//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const adminController = require('../../controllers/admin.controllers/admin.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/02/2023
 * @description Route add mutilp Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/add/student', adminController.AddStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/02/2023
 * @description Route logoutAdmin
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/logout', adminController.logoutAdmin);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 21/03/2023
 * @description Route Profile admin
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/profile', adminController.getProfileAdmin);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 21/03/2023
 * @description Route update profile admin
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update/profile', adminController.updateProfileAdmin);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 21/03/2023
 * @description Route change password admin
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/change-password', adminController.changePasswordAdmin);

module.exports = router;
