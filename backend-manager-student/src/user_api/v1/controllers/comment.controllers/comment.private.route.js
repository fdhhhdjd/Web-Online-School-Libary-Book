//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! SERVICE
const { insert_comment, get_paren_slug } = require('../../../../share/services/user_service/comment_service');

const commentController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @description create Comment
     * @function createComment
     */
    createComment: async (req, res) => {
        const { book_id, parent_slug, content } = req.body.input.comment_input;

        // Validate input
        if (!HELPER.validateBigInt(book_id) || !content) {
            // Return bad request error if input is invalid
            return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                element: {
                    result: MESSAGES.GENERAL.INVALID_INPUT,
                },
            });
        }

        // Get user Id from request
        const { id } = req.auth_user;

        try {
            // Generate slug and timestamp
            let slug = RANDOMS.createID();
            const posted = new Date();

            let full_slug = `${posted.toISOString()}:${slug}`;

            let new_slug;
            let search_paren_slug = {
                book_id,
                isdeleted: CONSTANTS.DELETED_DISABLE,
                slug: parent_slug,
            };
            const parenSlug = await get_paren_slug(search_paren_slug);

            let total_replies = 0;
            if (parenSlug) {
                // If parent slug exists, create child comment
                full_slug = `${parenSlug.full_slug}/${full_slug}`;
                new_slug = `${parenSlug.slug}/${slug}`;
                total_replies = parenSlug.comment_replies_num + 1;
            }

            // Insert comment into database
            insert_comment({
                book_id,
                user_id: id,
                posted,
                slug: new_slug ? new_slug : slug,
                parent_slug,
                comment_replies_num: total_replies,
                full_slug,
                content,
            })
                .then((final_rs) =>
                    // Return success response with inserted comment
                    res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                        status: CONSTANTS.HTTP.STATUS_2XX_OK,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                        element: {
                            result: final_rs,
                        },
                    }),
                )
                .catch((_) => {
                    // Return internal server error if comment insertion fails
                    console.error(_, 'error');
                    return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                        status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                        message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                    });
                });
        } catch (error) {
            console.error(error);
            // Return service unavailable error if an error occurs
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
