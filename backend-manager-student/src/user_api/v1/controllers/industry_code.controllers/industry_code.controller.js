//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const industry_code_model = require('../../../../share/models/industry_code.model');

const indusTryCodeController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/04/2022
     * @description detail IndustryCode
     * @function getDetailIndustryCode
     * @return {Object:{Number,String}}
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
     * @created_at 24/04/2022
     * @description Get all IndustryCode
     * @function getAllIndustryCode
     * @return {Object}
     */
    getAllIndustryCode: async (req, res) => {
        try {
            // detail Industry Code database
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
module.exports = indusTryCodeController;
