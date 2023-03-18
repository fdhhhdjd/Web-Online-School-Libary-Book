//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const bookController = require('../../controllers/author.controllers/author.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get detail author
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/detail/:book_id', bookController.getDetailAuthor);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get all author
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/all', bookController.getAllAuthor);

module.exports = router;
