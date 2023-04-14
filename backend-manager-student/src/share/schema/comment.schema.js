//! LIBRARY
const { Schema, model } = require('mongoose');

//! CONFIGS
const CONSTANTS = require('../configs/constants');

/**
* @author Nguyễn Tiến Tài
* @created_at 13/04/2023
* @description Schema Comment Mongo
*/
const commentSchema = new Schema({
    user_id: {
        type: String,
        required: CONSTANTS.DELETED_ENABLE,
    },
    book_id: {
        type: String,
        required: CONSTANTS.DELETED_ENABLE,
    },
    posted: {
        type: Date,
        required: CONSTANTS.DELETED_ENABLE,
    },
    content: {
        type: String,
        required: CONSTANTS.DELETED_ENABLE,
        maxLength: 150,
    },
    parent_slug: {
        type: String,
        trim: CONSTANTS.DELETED_ENABLE,
    },
    full_slug: {
        type: String,
        trim: CONSTANTS.DELETED_ENABLE,
    },
    slug: {
        type: String,
        trim: CONSTANTS.DELETED_ENABLE,
    },
    isdeleted: {
        type: Schema.Types.Boolean,
        default: CONSTANTS.DELETED_DISABLE,
    },
    comment_replies_num: {
        type: Number,
        default: 0,
    },

}, {
    collection: CONSTANTS.MONGO_SCHEMA.COLLECTION_NAME,
    timestamps: CONSTANTS.DELETED_ENABLE,
});
module.exports.COMMENT = model(CONSTANTS.MONGO.DOCUMENT_NAME, commentSchema);
