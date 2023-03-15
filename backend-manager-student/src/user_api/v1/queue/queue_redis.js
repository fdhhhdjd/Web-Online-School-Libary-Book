//! SERVICE
const book_user = require('./book_user/book.user');

//! SHARE
const CONSTANTS = require('../../../share/configs/constants');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/03/2023
 * @description Setup Redis PubSub Server USER_API.
 */

//! New Map Users
const userChannelHandlers = new Map();
userChannelHandlers.set(CONSTANTS.DELETE_KEY_CACHE_LRU, book_user.deleteKeyLRU);

module.exports = { userChannelHandlers }
