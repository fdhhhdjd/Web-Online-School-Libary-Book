const HELPER = require('../../utils/helper');
const CONSTANTS = require('../../configs/constants');
const CONFIGS = require('../../configs/config');
const REDIS_PUB_SUB = require('../../utils/redis_pub_sub_helper');
const RANDOMS = require('../../utils/random');

//! Model
const user_verification_model = require('../../models/user_verification.model');

module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 26/02/2023
     * @description Send email Link verification
     * @function createAdmin
     * @param { count,limitCount }
     * @return {Number}
     */
    handleSendEmailVerification: async (protocol, host, id, name, email) => {
        try {
            // Random key
            const ran_dom_unique_string = RANDOMS.createID();

            // Create Link check email
            const link_verify_email_student = HELPER.getURIFromTemplate(CONSTANTS.LINK_VERIFY_EMAIL_STUDENT, {
                protocol: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? protocol : CONSTANTS.PROTOCOl_DEV,
                host: CONFIGS.NODE_ENV === CONSTANTS.ENVIRONMENT_PRODUCT ? host : CONSTANTS.HOST_DEV,
                user_id: id,
                uniqueString: ran_dom_unique_string,
            });

            // Data insert verifycation
            const data_insert = {
                verify_id: ran_dom_unique_string,
                user_id: id,
                link_email_expire: Date.now() + CONSTANTS._10_SECONDS,
                // link_email_expire: Date.now() + CONSTANTS._10_MINUTES,
            };

            // Insert database
            await HELPER.handleRequest(user_verification_model.insertVerificationEmail(data_insert));

            // Data publish redis
            const data_link_email = {
                name,
                email,
                link_verify_email_student,
            };
            // Publish data queue Redis
            REDIS_PUB_SUB.sendEmailWithLock('user_check_link_email', data_link_email);
        } catch (error) {
            console.error(error);
        }
    },
};
