//! SHARE
const CONSTANTS = require('../share/configs/constants');

//! LIBRARY
const cron = require('node-cron');

//! MODEL
const cron_verification_student = require('./v1/cron_student/controllers/cron_verification.controller');
const cron_reset_password_student = require('./v1/cron_student/controllers/cron_reset_password.controller');

/**
 * @author Nguyễn Tiến Tài
 * @created_at 16/12/2022
 * @updated_at 28/02/2022, 30/03/2023
 * @description Run Cron delete verification
 */
cron.schedule(CONSTANTS._5_MINUTE_CRON, async () => {
    await Promise.all([
        // Delete verification
        cron_verification_student.cron_deleted_verification_student(),
        // Delete reset password
        cron_reset_password_student.cron_deleted_reset_password_student(),
    ]);
    console.info('Both tasks completed successfully');
});
console.info('Server cron running !!!');
