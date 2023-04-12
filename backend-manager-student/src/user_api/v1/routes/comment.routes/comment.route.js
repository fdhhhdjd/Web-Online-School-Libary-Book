//! LIBRARY
const router = require('express').Router();

//! CONTROLLER COMMENT
const commentController = require('../../controllers/comment.controllers/comment.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/04/2023
 * @description Route Take Comment book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/list', commentController.listComment);

module.exports = router;
