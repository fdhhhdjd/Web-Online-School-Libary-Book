//! LIBRARY
const router_general = require('express').Router();

//! ROUTES
const adminRouter = require('./admin.routes/admin.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @update_at 11/01/2023 && 28/02/2023
 * @description Route Admins
 */
router_general.use('/', adminRouter);

module.exports = router_general;
