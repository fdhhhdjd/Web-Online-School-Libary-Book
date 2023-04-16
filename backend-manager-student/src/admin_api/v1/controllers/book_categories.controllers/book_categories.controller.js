//! SHARE
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const book_category_model = require('../../../../share/models/book_categories.model');

const bookCategoriesController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description book categories
     * @function InsertBookCategory
     * @return {Object:{Number,String}}
     */
    InsertBookCategory: async (req, res) => {
        const { book_id, book_categories_array } = req.body.input.book_categories_input;

        // Parse data json
        let book_categories_array_parse = JSON.parse(book_categories_array);

        // Check input
        if (!book_categories_array_parse || !HELPER.validateBigInt(book_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        try {
            // Get data book_categories
            const book_categories = await book_category_model.getAllBookCategories(
                {
                    book_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                '*',
            );
            // Take  data filter
            let data_filter;

            if (book_categories) {
                data_filter = book_categories_array_parse.filter(
                    (item) => !book_categories.some((existingItem) => existingItem.category_id === item.category_id),
                );
            } else {
                // eslint-disable-next-line no-unused-vars
                data_filter = book_categories_array_parse;
            }
            if (Array.isArray(data_filter) && data_filter.length === 0) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.ALREADY_CATEGORIES_BOOK,
                    },
                });
            }
            let successResults = [];
            let errorResults = [];
            for (const data of data_filter) {
                // create Category database
                let err;
                let result;
                [err, result] = await HELPER.handleRequest(
                    book_category_model.createBookCategories({
                        book_categories_id: RANDOMS.createID(),
                        book_id,
                        category_id: data.category_id,
                    }),
                );
                if (result) {
                    successResults.push(result[0].book_categories_id);
                }
                if (err) {
                    errorResults.push(err);
                }
            }

            if (errorResults.length > 0) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    error: errorResults,
                });
            }

            return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                status: CONSTANTS.HTTP.STATUS_2XX_OK,
                message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                element: {
                    result: successResults,
                },
            });
        } catch (error) {
            console.error(error, '--------error------');
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description update Book Categories
     * @function updateBookCategories
     * @return {Object:{Number,String}}
     */
    updateBookCategories: async (req, res) => {
        const { book_categories_id, book_id, category_id } = req.body.input.book_categories_input;

        // Check input
        if (
            !HELPER.validateBigInt(category_id)
            || !HELPER.validateBigInt(book_id)
            || !HELPER.validateBigInt(book_categories_id)
        ) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        try {
            // update category database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                book_category_model.updateBookCategories(
                    {
                        book_id,
                        category_id,
                    },
                    {
                        book_categories_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    { book_categories_id: 'book_categories_id' },
                ),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].book_categories_id,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description delete book category
     * @function deleteCategories
     * @return {Object:{Number,String}}
     */
    deleteBookCategories: async (req, res) => {
        const { book_categories_id } = req.body.input.book_categories_input;

        // Check input
        if (!HELPER.validateBigInt(book_categories_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // Check account already delete
            const result_book_categories_detail = await book_category_model.getBookCategoriesById(
                {
                    book_categories_id,
                    isdeleted: CONSTANTS.DELETED_ENABLE,
                },
                {
                    book_categories_id: 'book_categories_id',
                },
            );
            if (result_book_categories_detail.length > 0) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_DELETE_CATEGORIES,
                    },
                });
            }
            // Delete author database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                book_category_model.updateBookCategories(
                    {
                        isdeleted: CONSTANTS.DELETED_ENABLE,
                    },
                    {
                        book_categories_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    {
                        book_categories_id: 'book_categories_id',
                    },
                ),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].book_categories_id,
                    },
                });
            }
            if (err) {
                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description detail book category
     * @function getDetailBookCategories
     * @return {Object:{Number,String}}
     */
    getDetailBookCategories: async (req, res) => {
        const book_categories_id = req.params.book_categories_id;
        // Check input
        if (!HELPER.validateBigInt(book_categories_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // detail category database
            const result_book_categories_detail = await book_category_model.getBookCategoriesById(
                {
                    book_categories_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                '*',
            );
            if (result_book_categories_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_book_categories_detail[0],
                    },
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 15/04/2023
     * @description Get all book categories
     * @function getAllBookCategories
     * @return {Object:{Number,String}}
     */
    getAllBookCategories: async (req, res) => {
        try {
            // detail categories database
            const result_book_categories_detail = await book_category_model.getAllBookCategories(
                {
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                '*',
            );
            if (result_book_categories_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_book_categories_detail,
                    },
                });
            }
        } catch (error) {
            return res.status(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE).json({
                status: CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE,
                message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_SERVICE_UNAVAILABLE),
                element: {
                    result: MESSAGES.GENERAL.SERVER_OUT_OF_SERVICE,
                },
            });
        }
    },
};
module.exports = bookCategoriesController;
