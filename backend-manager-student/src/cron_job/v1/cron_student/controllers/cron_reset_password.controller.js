//! Share
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');

//! Model
const user_reset_password_model = require('../../../../share/models/user_reset_password.model');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 28/02/2022
     * @description cron_deleted_reset_password_student
     * @function cron_deleted_reset_password_student
     */
    async cron_deleted_reset_password_student() {
        try {
            // Get all table reset_password
            const resetPasswordList = await user_reset_password_model.getResetPasswordList();

            // Verification exit data
            if (resetPasswordList.length > 0) {
                // Repeat every data
                for (const resetPassword of resetPasswordList) {
                    // Check data is expired
                    const isExpired = HELPER.isExpired(resetPassword.reset_password_expire);

                    // If expired delete
                    if (isExpired !== CONSTANTS.DELETED_DISABLE) {
                        await user_reset_password_model.updateResetPassword(
                            { isdeleted: CONSTANTS.DELETED_ENABLE },
                            { id: resetPassword.id },
                            { id: 'id' },
                        );
                    }
                }

                console.info('CRON DELETE RESET PASSWORD DONE !');
            } else {
                console.error('NO LIST RESET PASSWORD!!!');
            }
        } catch (error) {
            console.error('UPDATE FAIL!', error);
        }
    },
};
