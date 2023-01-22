module.exports = {
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2022
     * @description REGEX EMAIL
     */
    REGEX_EMAIL:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2022
     * @description REGEX DATE
     */
    REGEX_DATE: /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/g,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2022
     * @description REGEX PHONE
     */
    REGEX_PHONE: /^(0[3|5|7|8|9])+([0-9]{8})$/,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2022
     * @description REGEX TIME
     */
    REGEX_TIME: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5]\d)(:[0-5]\d)$/g,
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2022
     * @description REGEX PASSWORD
     */
    REGEX_PASSWORD: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2022
     * @description REGEX CHARACTER
     */
    REGEX_CHARACTER: '!@#$%^&*()_+-=[]{}|;\':"<>,.?/\\',
    REGEX_NOT_CHARACTER: '<>&\'";',
    /**
     * @author Nguyễn Tiến Tài
     * @created_at 22/01/2022
     * @description REGEX CHARACTER
     */
    REGEX_RANDOM: 'ABCDEFGHIJKLMNOPQWXYZa/~12&89b11cdefghijklmnopq+-rstuvwxyz0123456asdasd9'
};
