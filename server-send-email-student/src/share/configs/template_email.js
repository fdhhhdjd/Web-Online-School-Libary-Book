/**
     * @author Nguyễn Tiến Tài
     * @created_at 23/02/2022
     * @description Message template email
     */
module.exports = {
    STUDENT_WARNING_HACKER: {
        SUBJECT: 'Verify Your Email',
        TEMPLATE: 'Warning_account_by_hacker',
    },
    STUDENT_RESET_PASSWORD: {
        SUBJECT: 'Verify Your ELink Reset Password ${name}',
        TEMPLATE: 'link_reset_password_student',
    },
    STUDENT_VERIFICATION_EMAIL: {
        SUBJECT: 'Verification Email ${name}',
        TEMPLATE: 'link_verification_email_student',
    },
};
