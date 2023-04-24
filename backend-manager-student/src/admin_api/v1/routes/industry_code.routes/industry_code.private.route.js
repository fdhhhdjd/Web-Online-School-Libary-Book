//! LIBRARY
const router = require('express').Router();

//! CONTROLLER USER
const industryCodeController = require('../../controllers/industry_code.controllers/industry_code.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/04/2023
 * @description Route create industry code
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', industryCodeController.InsertIndustryCode);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/04/2023
 * @description Route update industry code
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update', industryCodeController.updateIndustryCode);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/04/2023
 * @description Route delete industry code
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', industryCodeController.deleteIndustryCode);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/04/2023
 * @description Route get detail industry code
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:industry_code_id', industryCodeController.getDetailIndustryCode);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 24/04/2023
 * @description Route get all industry code
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', industryCodeController.getAllIndustryCode);

module.exports = router;
