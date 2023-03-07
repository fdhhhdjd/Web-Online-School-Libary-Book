//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const categoriesController = require('../../controllers/categories.controllers/categories.private.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route get detail categories
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/detail/:category_id', categoriesController.getDetailCategories);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 07/03/2023
 * @description Route get all categories
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/all', categoriesController.getAllCategories);

module.exports = router;
