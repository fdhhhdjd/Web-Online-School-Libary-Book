//! LIBRARY
const router = require('express').Router();

//! CONTROLLER COMMENT
const commentController = require('../../controllers/comment.controllers/comment.private.route');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/04/2023
 * @description Route Create Comment book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', commentController.createComment);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 23/04/2023
 * @description Route Delete Comment book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', commentController.deleteComment);

module.exports = router;
