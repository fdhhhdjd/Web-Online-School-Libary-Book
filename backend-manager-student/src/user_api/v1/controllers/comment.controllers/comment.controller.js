//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const HELPER = require('../../../../share/utils/helper');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! SERVICE
const { list_comment } = require('../../../../share/services/user_service/comment_service');
const book_model = require('../../../../share/models/book.model');

const commentController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @description List Comment
     * @function createComment
     */
    listComment: async (req, res) => {
        const { book_id, slug } = req.body.input.comment_input;

        // Validate input
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
            // Check if book exists
            const book = await book_model.getBookById(
                {
                    book_id,
                    isdeleted: CONSTANTS.DELETED_DISABLE,
                },
                {
                    book_id: 'book_id',
                },
            );
            if (!book || !book.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_NOT_BOOK,
                    },
                });
            }

            // Retrieve comments for book
            const match = {
                book_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
            };
            if (slug !== '') {
                match.full_slug = new RegExp(slug, 'i');
            }

            const search_data = {
                _id: 0,
                user_id: 1,
                book_id: 1,
                content: 1,
                slug: 1,
                full_slug: 1,
                parent_slug: 1,
                comment_replies_num: 1,
            };
            const comments = await list_comment(match, search_data);

            // Return list of comments
            return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                status: CONSTANTS.HTTP.STATUS_2XX_OK,
                message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                element: {
                    result: comments,
                },
            });
        } catch (error) {
            // Handle errors
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
