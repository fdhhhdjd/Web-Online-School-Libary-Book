//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! MODEL
const comment_model = require('../../../../share/models/comment.model');

const commentController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @description create Comment
     * @function createComment
     */
    createComment: async (req, res) => {
        const { book_id, parent_slug, content } = req.body.input.comment_input;

        // Check input
        if (!HELPER.validateBigInt(book_id) || !content) {
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }
        // Take user Id
        const { id } = req.auth_user;

        try {
            let slug = RANDOMS.createID();
            const posted = new Date();

            let full_slug = `${posted.toISOString()}:${slug}`;

            let new_slug;
            let search_paren_slug = {
                book_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
                slug: parent_slug,
            };
            const parenSlug = await comment_model.getCommentById(search_paren_slug, {
                full_slug: 'full_slug',
                slug: 'slug',
                comment_replies_num: 'comment_replies_num',
            });
            let total_replies = 0;
            if (parenSlug[0]) {
                // comment child
                full_slug = `${parenSlug[0].full_slug}/${full_slug}`;
                new_slug = `${parenSlug[0].slug}/${slug}`;
                total_replies = parenSlug[0].comment_replies_num + 1;
            }

            // create comment database
            let err;
            let result;
            [err, result] = await HELPER.handleRequest(
                comment_model.createComment({
                    comment_id: RANDOMS.createID(),
                    book_id,
                    user_id: id,
                    slug: new_slug ? new_slug : slug,
                    parent_slug,
                    comment_replies_num: total_replies,
                    full_slug,
                    content,
                }),
            );
            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                    element: {
                        result: result[0].comment_id,
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
