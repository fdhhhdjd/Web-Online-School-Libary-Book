//! CONFIGS
const CONSTANTS = require('../../configs/constants');

//! SCHEMA
const { COMMENT } = require('../../schema/comment.schema');

//! MODEL
const user_model = require('../../models/user.model');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 13/04/2023
 * @description create Comment
 * @function insert_comment
 */
const insert_comment = async (data) => await COMMENT.create(data);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 13/04/2023
 * @updated_at 14/04/2023
 * @description List Comment
 * @function list_comment
 */
const list_comment = async (match, search_data) => {
    const comments = await COMMENT.find(match, search_data).sort({ full_slug: 1 }).lean();
    const userPromises = comments.map(async (comment) => {
        const user = await user_model.getStudentById(
            {
                user_id: String(comment.user_id),
                isdeleted: CONSTANTS.DELETED_DISABLE,
            },
            {
                name: 'name',
                avatar_uri: 'avatar_uri',
            },
        );
        return {
            ...comment,
            full_name: user[0]?.name,
            avatar_uri_user: user[0]?.avatar_uri,
        };
    });
    // eslint-disable-next-line no-shadow
    const list_comment = await Promise.all(userPromises);
    return list_comment;
};

/**
 * @author Nguyễn Tiến Tài
 * @created_at 13/04/2023
 * @description get paren slug
 * @function get_paren_slug
 */
const get_paren_slug = async (data) => await COMMENT.findOne(data).lean();

module.exports = {
    insert_comment,
    list_comment,
    get_paren_slug,
};
