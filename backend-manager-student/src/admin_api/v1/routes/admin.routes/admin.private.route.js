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
 * @description Route add mutilp Student
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/logout', adminController.logoutAdmin);

module.exports = router;
