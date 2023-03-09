//! Share
const HELPER = require('../../../../share/utils/helper');
const CONSTANTS = require('../../../../share/configs/constants');

//! Model
const user_verification_model = require('../../../../share/models/user_verification.model');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 16/12/2022
     * @updated_at 28/02/2022
     * @description cron_deleted_verification_student
     * @function cron_deleted_verification_student
     */
    async cron_deleted_verification_student() {
        try {
            // Get all table verification
            const verificationList = await user_verification_model.getVerificationList();

            // Verification exit data
            if (verificationList.length > 0) {
                // Repeat every data
                for (const verification of verificationList) {
                    // Check data is expired
                    const isExpired = HELPER.isExpired(verification.linkEmailExpire);

                    // If expired delete
                    if (isExpired) {
                        await user_verification_model.updateVerification(
                            { isdeleted: CONSTANTS.DELETED_ENABLE },
                            { verify_id: verification.verify_id },
                            { verify_id: 'verify_id' },
                        );
                    }
                }

                console.info('CRON DELETE VERIFICATION DONE !');
            } else {
                console.error('NO LIST VERIFICATION!!!');
            }
        } catch (error) {
            console.error('UPDATE FAIL!', error);
        }
    },
};
