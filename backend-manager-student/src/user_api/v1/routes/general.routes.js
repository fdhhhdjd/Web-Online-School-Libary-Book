//! LIBRARY
const router_general = require('express').Router();

//! ROUTES
const userRouter = require('./users.routes/user.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route Student
 */
router_general.use('/', userRouter);

module.exports = router_general;
