//! LIBRARY
const router = require('express').Router();

//! CONTROLLER BOOK CATEGORIES
const bookCategoriesController = require('../../controllers/book_categories.controllers/book_categories.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/04/2023
 * @description Route create book categories book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', bookCategoriesController.InsertBookCategory);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/04/2023
 * @description Route update book categories
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update', bookCategoriesController.updateBookCategories);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/04/2023
 * @description Route delete book categories
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', bookCategoriesController.deleteBookCategories);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/04/2023
 * @description Route get detail book categories
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:book_categories_id', bookCategoriesController.getDetailBookCategories);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/04/2023
 * @description Route get all book categories
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', bookCategoriesController.getAllBookCategories);

module.exports = router;
