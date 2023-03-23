/**
 * @author Nguyễn Tiến Tài
 * @created_at 23/03/2023
 * @description File Messages General
 */
module.exports = {
    STUDENT: {
        // ? SERVER STUDENT
        SERVER: 'Server Student Api!',

        // ? ACCOUNT NOT EXITS
        NOT_EXIT_ACCOUNT: 'Account Student not exit!',

        // ? ACCOUNT PAN 24H
        PAN_ACCOUNT_STUDENT: 'Account of you block 24h!',

        // ? WARNING
        WARNING_LOGIN: 'Warning number of logins',
        WARNING_PASSWORD: 'Warning Times Enter Password',

        // ? ROLE STUDENT
        ROLE_STUDENT: 'You not is student!',

    },
    ADMIN: {
        // ? SERVER ADMIN
        SERVER: 'Server Admin Api! ',

        // ? ACCOUNT NOT EXITS
        NOT_EXIT_ACCOUNT: 'Account admin not exit!',
    },
    GENERAL: {

        // ? INVALID INPUT HEADER,..
        INVALID_INPUT: 'Invalid input!',
        INVALID_HEADER: 'Invalid Header!',
        INVALID_EMAIL_PHONE: 'Invalid email or phone number!',
        INVALID_DATE: 'Invalid date of birth',
        INVALID_MUTILP_FIELD: 'Please provide non-empty values for all fields',
        INVALID_UNAUTHORIZED: 'Unauthorized',

        // ? EXITS
        EXITS_EMAIL_PHONE: 'Email or Phone or Email or Mssv exits !',
        EXITS_NOT_BOOK: 'Book Not Found!',
        EXITS_DELETE_BOOK: 'Book already delete!',
        EXITS_DELETE_AUTHOR: 'Author already delete!',
        EXITS_DELETE_CATEGORIES: 'Categories already delete !',
        EXITS_UPDATE_BORROW: 'Already update borrow book !',
        EXITS_CAN_ONLY_TOW_BORROW: 'You can only borrow tow book!',

        // ? ALREADY
        ALREADY_BOOK_BORROW: 'Book already borrow !!',
        ALREADY_EMAIL_CHECK_LINK: 'Link reset Exit Please check Email !',

        // ? PLEASE
        PLEASE_REFUND_BOOK: 'Please refund the book !!',
        PLEASE_CHECK_EMAIL: 'Please check Email!',

        // ? FAIL
        BORROW_FAIL: 'Borrow Fail!',
        RESET_PASSWORD_FAIL: 'Reset Password Fail',

        // ? CONFLICT OR DUPLICATE
        CONFLICT_ADD_STUDENT: 'Nothing changes to update!',

        // ? NOTFOUND
        NOTFOUND: 'Not Found!',
        NOTFOUND_DEVICE: 'Device NotFound!',
        BOOK_OUT_OF_STOCK: 'Book Out Of Stock!',
        LINK_RESET_NOT_FOUND: 'Link Reset NotFound!',
        LINK_RESET_EXPIRED: 'Link Expired,Please change Link defense !',

        // ? PASSWORD
        PASSWORD_INCORRECT: 'Password Is Incorrect !',
        PASSWORD_CONFIRM_INCORRECT: 'Password and confirm password does not match!',
        PASSWORD_NOT_BAD: 'Includes 6 characters, uppercase, lowercase and some and special characters.',
        PASSWORD_BEEN_RESET: 'Password has been reset !',

        // ? TOKEN
        REFETCH_TOKEN_EXPIRE: 'Refresh_token Expired !!!!',
        TOKEN_EXPIRE: 'Expired Token!',
        INVALID_TOKEN: 'Invalid Token!',
        EXPIRED_SESSION_TOKEN: 'Login session expired',

        // ? SERVER
        SERVER_OUT_OF_SERVICE: 'Out Of Service',

        // ? SUCCESS
        SUCCESS_CHANGE_PASSWORD: 'Change Password Success!',
        SUCCESS_UPDATE_BORROW: 'Update Student borrow book success !',
        SUCCESS_UPDATE_BORROW_STUDENT_REFUND: 'Update Student refund book success !',
        SUCCESS_BORROW_BOOK_SUCCESS: 'Invite you go to Library confirm,Thank',
    },
};
