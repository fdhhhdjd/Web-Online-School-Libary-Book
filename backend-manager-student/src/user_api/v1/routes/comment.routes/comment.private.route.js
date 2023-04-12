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

module.exports = router;
