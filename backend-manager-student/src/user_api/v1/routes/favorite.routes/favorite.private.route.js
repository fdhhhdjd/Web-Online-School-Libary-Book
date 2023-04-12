//! LIBARY
const router = require('express').Router();

//! CONTROLLER
const favoriteBookController = require('../../controllers/favorite.controllers/favorite.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/04/2023
 * @description Route Create Favorite
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/create', favoriteBookController.createFavorites);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/04/2023
 * @description Route Delete Favorite
 * @param {('POST')} [method='POST'] The request's method
 */
router.post('/delete', favoriteBookController.deleteFavorites);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 12/04/2023
 * @description Route Get All Favorite
 * @param {('GET')} [method='GET'] The request's method
 */
router.get('/get/all', favoriteBookController.getallFavorites);

module.exports = router;
