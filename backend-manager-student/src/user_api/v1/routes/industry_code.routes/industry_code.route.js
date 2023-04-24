//! LIBRARY
const router = require('express').Router();

//! CONTROLLER USER
const industryCodeController = require('../../controllers/industry_code.controllers/industry_code.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/04/2023
 * @description Route get detail industry_code
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/detail/:industry_code_id', industryCodeController.getDetailIndustryCode);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/04/2023
 * @description Route get all industry_code
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/all', industryCodeController.getAllIndustryCode);

module.exports = router;
