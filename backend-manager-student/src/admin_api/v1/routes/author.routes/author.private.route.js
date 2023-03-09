//! LIBARY
const router = require('express').Router();

//! CONTROLLER USER
const authorController = require('../../controllers/author.controllers/author.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route create author
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', authorController.createAuthor);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route update author
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/update', authorController.updateAuthor);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route delete author
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', authorController.deleteAuthor);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get detail author
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/detail/:author_id', authorController.getDetailAuthor);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/01/2023
 * @description Route get all author
 * @param {('POST')} [method='POST'] The request's method
 */
router.get('/all', authorController.getAllAuthor);

module.exports = router;
