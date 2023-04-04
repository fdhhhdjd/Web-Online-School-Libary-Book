//! LIBRARY
const router = require('express').Router();

//! CONTROLLER RATING
const ratingController = require('../../controllers/rating.controllers/rating.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/04/2023
 * @description Route Create rating book
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', ratingController.createRating);

module.exports = router;
