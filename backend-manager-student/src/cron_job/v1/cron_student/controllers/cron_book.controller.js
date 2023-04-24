//! SHARE
const CONSTANTS = require('../../../../share/configs/constants');
const { handleException } = require('../../../../share/utils/redis_pub_sub_helper');

//! MODEL
const { list_comment_id } = require('../../../../share/services/user_service/comment_service');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 24/04/2023
     * @description cron_delete_comment_book_student
     * @function cron_delete_comment_book_student
     */
    async cron_delete_comment_book_student() {
        try {
            // Get all table book List
            const bookList = await list_comment_id();

            console.info('listBook::::', bookList);
        } catch (error) {
            console.error('UPDATE FAIL!', error);
            handleException(error, CONSTANTS.NAME_SERVER.CRON);
        }
    },
};
