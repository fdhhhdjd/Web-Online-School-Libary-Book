const router = require('express').Router();
const adminController = require('../../controllers/admin.controllers/admin.controller');
/**
 * @author Nguyễn Tiến Tài
 * @created_at 17/12/2022
 * @update_at 11/01/2023
 * @description Route login admin
 */
router.post('/login', adminController.LoginAdmin);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 28/02/2023
 * @description Route renew-token token
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/renew-token', adminController.reNewToken);

module.exports = router;
