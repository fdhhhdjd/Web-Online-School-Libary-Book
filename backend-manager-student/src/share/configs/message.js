/**
 * @author Nguyễn Tiến Tài
 * @created_at 23/03/2023
 * @description File Messages General
 */
module.exports = {
    STUDENT: {
        SERVER: 'Server Student Api!',
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
        // ? EXITS
        EXITS_EMAIL_PHONE: 'Email or Phone or Email or Mssv exits !',
        EXITS_NOT_BOOK: 'Book Not Found!',
        EXITS_UPDATE_BORROW: 'Already update borrow book !',
        EXITS_DELETE_BOOK: 'Book already delete!',
        EXITS_DELETE_AUTHOR: 'Author already delete!',
        EXITS_DELETE_CATEGORIES: 'Categories already delete !',

        // ? CONFLICT OR DUPLICATE
        CONFLICT_ADD_STUDENT: 'Nothing changes to update!',

        // ? NOTFOUND
        NOTFOUND: 'Not Found!',

        // ? PASSWORD
        PASSWORD_INCORRECT: 'Password Is Incorrect !',
        PASSWORD_CONFIRM_INCORRECT: 'Password and confirm password does not match!',
        PASSWORD_NOT_BAD: 'Includes 6 characters, uppercase, lowercase and some and special characters.',

        // ? TOKEN
        REFETCH_TOKEN_EXPIRE: 'Refresh_token Expired !!!!',
        TOKEN_EXPIRE: 'Token Fail!',

        // ? SERVER
        SERVER_OUT_OF_SERVICE: 'Out Of Service',

        // ? SUCCESS
        SUCCESS_CHANGE_PASSWORD: 'Change Password Success!',
        SUCCESS_UPDATE_BORROW: 'Update Student borrow book success !',
        SUCCESS_UPDATE_BORROW_STUDENT_REFUND: 'Update Student refund book success !',
    },
};
