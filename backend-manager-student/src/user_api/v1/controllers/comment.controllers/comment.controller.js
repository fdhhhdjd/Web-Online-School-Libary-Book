//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const HELPER = require('../../../../share/utils/helper');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const comment_model = require('../../../../share/models/comment.model');

const commentController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @description List Comment
     * @function createComment
     */
    listComment: async (req, res) => {
        const { book_id, slug } = req.body.input.comment_input;

        // Check input
        if (!HELPER.validateBigInt(book_id)) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        try {
            const match = {
                book_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
            };
            if (slug !== '') {
                // eslint-disable-next-line dot-notation
                match['full_slug'] = new RegExp(slug, 'i');
            }
            // create comment database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                comment_model.getAllComment(match, '*'),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result,
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
            console.error(error);
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
module.exports = commentController;
