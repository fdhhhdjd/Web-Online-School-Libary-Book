//! SHARE
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const category_model = require('../../../../share/models/categories.model');

const categoriesController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 03/02/2022
     * @description create categories
     * @function InsertCategory
     * @return {Object:{Number,String}
     */
    InsertCategory: async (req, res) => {
        const { name } = req.body.input.categories_input;

        // Check input
        if (!name) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // create Category database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                category_model.createCategories({
                    category_id: RANDOMS.createID(),
                    name,
                }),
            );
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].category_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
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
     * @created_at 03/02/2022
     * @description update category
     * @function updateAuthor
     * @return {Object:{Number,String}
     */
    updateCategories: async (req, res) => {
        const { category_id, name } = req.body.input.categories_input;

        // Check input
        if (!category_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }

        //Check Input is empty
        if (
            (name !== undefined && name.trim() === '')
        ) {
            return res.status(400).json({
                status: 400,
                message: 'Please provide non-empty values for all fields',
            });
        }

        try {
            // update category database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                category_model.updateCategories(
                    {
                        name,
                    },
                    { category_id },
                    { category_id: 'category_id' },
                ),
            );
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].category_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
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
     * @created_at 03/02/2022
     * @description delete category
     * @function deleteCategories
     * @return {Object:{Number,String}
     */
    deleteCategories: async (req, res) => {
        const { category_id } = req.body.input.categories_input;

        // Check input
        if (!category_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // Check account already delete
            const result_categories_detail = await category_model.getCategoriesById(
                { category_id, isdeleted: CONSTANTS.DELETED_ENABLE },
                { category_id: 'category_id' },
            );
            if (result_categories_detail.length > 0) {
                return res.status(400).json({
                    status: 400,
                    message: returnReasons('400'),
                    element: {
                        result: 'Categories already delete !',
                    },
                });
            }
            // Delete author database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                category_model.updateCategories(
                    {
                        isdeleted: CONSTANTS.DELETED_ENABLE,
                    },
                    { category_id },
                    { category_id: 'category_id' },
                ),
            );
            if (result) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result[0].category_id,
                    },
                });
            }
            if (err) {
                return res.status(500).json({
                    status: 500,
                    message: returnReasons('500'),
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
     * @created_at 03/02/2022
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
     * @created_at 03/02/2022
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
