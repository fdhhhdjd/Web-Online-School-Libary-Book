//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
const MESSAGES = require('../../../../share/configs/message');
const HELPER = require('../../../../share/utils/helper');
const RANDOMS = require('../../../../share/utils/random');

//! MODEL
const book_model = require('../../../../share/models/book.model');

//! MIDDLEWARE
const { returnReasons } = require('../../../../share/middleware/handle_error');

//! SERVICE
const {
    insert_comment,
    get_paren_slug,
    delete_comment,
    list_comment_slug,
    get_comment_id,
} = require('../../../../share/services/user_service/comment_service');

const commentController = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 09/04/2023
     * @updated_at 23/04/2023
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
            // Check book exit in databse
            const check_book_not_exit = await book_model.getBookById(
                { book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                {
                    book_id: 'book_id',
                },
            );
            if (!check_book_not_exit || !check_book_not_exit.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_NOT_BOOK,
                    },
                });
            }

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

    /**
     * @author Nguyễn Tiến Tài
     * @created_at 23/04/2023
     * @description delete Comment
     * @function deleteComment
     */
    deleteComment: async (req, res) => {
        const { comment_id } = req.body.input.comment_input;
        // Validate input
        if (!comment_id) {
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
            // Check comment exit in databse
            const data_comment_id = await get_comment_id({ _id: comment_id, user_id: id });
            if (!data_comment_id) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_NOT_COMMENT,
                    },
                });
            }
            // Check book exit in databse
            const check_book_not_exits = await book_model.getBookById(
                { book_id: data_comment_id.book_id, isdeleted: CONSTANTS.DELETED_DISABLE },
                {
                    book_id: 'book_id',
                },
            );
            if (!check_book_not_exits || !check_book_not_exits.length) {
                return res.status(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST).json({
                    status: CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_4XX_BAD_REQUEST),
                    element: {
                        result: MESSAGES.GENERAL.EXITS_NOT_BOOK,
                    },
                });
            }
            const match = {
                book_id: data_comment_id.book_id,
                full_slug: new RegExp(data_comment_id.slug, 'i'),
            };

            const search_data = {
                _id: 1,
            };
            const comments = await list_comment_slug(match, search_data);

            // Delete comment
            let err;
            let result;
            if (!comments || !comments.length) {
                [err, result] = await HELPER.handleRequest(delete_comment({ _id: comment_id, user_id: id }));
            } else {
                for (const list_comment_delete of comments) {
                    [err, result] = await HELPER.handleRequest(
                        delete_comment({ _id: list_comment_delete._id, user_id: id }),
                    );
                }
            }

            if (result) {
                return res.status(CONSTANTS.HTTP.STATUS_2XX_OK).json({
                    status: CONSTANTS.HTTP.STATUS_2XX_OK,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_2XX_OK),
                });
            }
            if (err) {
                console.error(err);

                return res.status(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR).json({
                    status: CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR,
                    message: returnReasons(CONSTANTS.HTTP.STATUS_5XX_INTERNAL_SERVER_ERROR),
                });
            }
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
