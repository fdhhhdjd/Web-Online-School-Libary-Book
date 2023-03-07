//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const author_model = require('../../../../share/models/author.model');

const authorController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 07/03/2022
     * @description detail Author
     * @function getDetailAuthor
     * @return {Object:{Number,String}
     */
    getDetailAuthor: async (req, res) => {
        const author_id = req.params.author_id;
        // Check input
        if (!author_id) {
            return res.status(400).json({
                status: 400,
                message: returnReasons('400'),
            });
        }
        try {
            // detail author database
            const result_author_detail = await author_model.getAuthorById(
                { author_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                '*',
            );
            if (result_author_detail) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_author_detail[0],
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
     * @description Get all Author
     * @function getAllAuthor
     * @return {Object:{Number,String}
     */
    getAllAuthor: async (req, res) => {
        try {
            // detail author database
            const result_author_detail = await author_model.getAllAuthor({ isdeleted: CONSTANTS.DELETED_DISABLE }, '*');
            if (result_author_detail) {
                return res.status(200).json({
                    status: 200,
                    message: returnReasons('200'),
                    element: {
                        result: result_author_detail,
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
module.exports = authorController;
