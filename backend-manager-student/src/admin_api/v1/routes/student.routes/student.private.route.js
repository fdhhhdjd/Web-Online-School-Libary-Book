//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const studentController = require('../../controllers/student.controllers/student.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/03/2023
 * @description Route create student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', studentController.createStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/03/2023
 * @description Route Update student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update', studentController.updateStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 25/03/2023
 * @description Route delete student
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', studentController.deleteStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/03/2023
 * @description Route get detail student
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:student_id', studentController.getDetailStudent);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/03/2023
 * @description Route get all student
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', studentController.getAllStudent);

module.exports = router;
