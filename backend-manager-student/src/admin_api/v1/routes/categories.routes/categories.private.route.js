//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const categoriesController = require('../../controllers/categories.controllers/categories.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route create categories
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', categoriesController.InsertCategory);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route update categories
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update', categoriesController.updateCategories);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route delete categories
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', categoriesController.deleteCategories);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get detail categories
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:category_id', categoriesController.getDetailCategories);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get all categories
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', categoriesController.getAllCategories);

module.exports = router;
