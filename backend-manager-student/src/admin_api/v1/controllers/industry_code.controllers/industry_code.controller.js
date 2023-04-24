//! SHARE
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const industry_code_model = require('../../../../share/models/industry_code.model');

const industryCodeController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/04/2023
     * @description Create Industry Code
     * @function InsertIndustryCode
     * @return {Object}
     */
    InsertIndustryCode: async (req, res) => {
        const { name } = req.body.input.industry_input;

        // Check input
        if (!name) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // create Category database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                industry_code_model.createIndustryCode({
                    industry_code_id: RANDOMS.createID(),
                    name,
                }),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].industry_code_id,
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
     * @created_at 24/04/2023
     * @description update Industry Code
     * @function updateIndustryCode
     * @return {Object}
     */
    updateIndustryCode: async (req, res) => {
        const { industry_code_id, name } = req.body.input.industry_input;

        // Check input
        if (!industry_code_id || !HELPER.validateBigInt(industry_code_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        // Check Input is empty
        if (name !== undefined && name.trim() === '') {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_MUTILP_FIELD,
                },
            });
        }

        try {
            // update IndustryCode database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                industry_code_model.updateIndustryCode(
                    {
                        name,
                    },
                    {
                        industry_code_id,
                        isdeleted: CONSTANTS.DELETED_DISABLE,
                    },
                    {
                        industry_code_id: 'industry_code_id',
                    },
                ),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].industry_code_id,
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
     * @created_at 24/04/2023
     * @description delete Industry Code
     * @function deleteIndustryCode
     * @return {Object}
     */
    deleteIndustryCode: async (req, res) => {
        const { industry_code_id } = req.body.input.industry_input;

        // Check input
        if (!industry_code_id) {
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
            const result_industry_code_detail = await industry_code_model.getIndustryCodeById(
                { industry_code_id, isdeleted: CONSTANTS.DELETED_ENABLE },
                { industry_code_id: 'industry_code_id' },
            );
            if (result_industry_code_detail.length > 0) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_DELETE_INDUSTRY_CODE,
                    },
                });
            }
            // Delete industry_code database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                industry_code_model.updateIndustryCode(
                    {
                        isdeleted: CONSTANTS.DELETED_ENABLE,
                    },
                    { industry_code_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                    { industry_code_id: 'industry_code_id' },
                ),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].industry_code_id,
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
     * @created_at 24/04/2023
     * @description detail Industry Code
     * @function getDetailIndustryCode
     * @return {Object}
     */
    getDetailIndustryCode: async (req, res) => {
        const industry_code_id = req.params.industry_code_id;
        // Check input
        if (!industry_code_id) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            // detail industry_code database
            const result_industry_code_detail = await industry_code_model.getIndustryCodeById(
                { industry_code_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );
            if (result_industry_code_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_industry_code_detail[0],
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
     * @created_at 24/04/2023
     * @description Get all Industry Code
     * @function getAllIndustryCode
     * @return {Object}
     */
    getAllIndustryCode: async (req, res) => {
        try {
            // detail industry_code database
            const result_industry_code_detail = await industry_code_model.getAllIndustryCode(
                { isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );
            if (result_industry_code_detail) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result_industry_code_detail,
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
module.exports = industryCodeController;
