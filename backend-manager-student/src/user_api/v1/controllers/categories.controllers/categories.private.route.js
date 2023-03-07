//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const category_model = require('../../../../share/models/categories.model');

const categoriesController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2022
     * @description detail category
     * @function getDetailAuthor
     * @return {Object:{Number,String}
     */
    getDetailCategories: async (req, res) => {
        const category_id = req.params.category_id;
        // Check input
        if (!category_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // detail category database
            const result_categories_detail = await category_model.getCategoriesById(
                { category_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );
            if (result_categories_detail) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_categories_detail[0],
                    },
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2022
     * @description Get all categories
     * @function getAllCategories
     * @return {Object:{Number,String}
     */
    getAllCategories: async (req, res) => {
        try {
            // detail categories database
            const result_categories_detail = await category_model.getAllCategories(
                { isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );
            if (result_categories_detail) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_categories_detail,
                    },
                });
            }
        } catch (error) {
            return res.status(503).json({
                status: 503,
                message: returnReasons('503'),
                element: {
                    result: 'Out Of Service',
                },
            });
        }
    },
};
module.exports = categoriesController;
