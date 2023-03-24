const API_STUDENT = {
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 02/03/2023
   * @descriptionKey API login student
   */
  LOGIN_STUDENT: '/student/v1/user/login',
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 15/03/2023
   * @descriptionKey API change password student
   */
  CHANGE_PASSWORD_STUDENT: '/student/v1/user/private/change-password',
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 16/03/2023
   * @descriptionKey API forget password student
   */
  FORGET_PASSWORD_STUDENT: '/student/v1/user/forget-password',
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 03/03/2023
   * @descriptionKey API profile student
   */
  PROFILE_STUDENT: '/student/v1/user/private/profile',
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 06/03/2023
   * @descriptionKey API LOGOUT
   */
  LOGOUT_STUDENT: '/student/v1/user/private/logout',
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 04/03/2023
   * @descriptionKey API new token student
   */
  RE_NEW_TOKEN_STUDENT: '/student/v1/user/renew-token',
  /**
   * @author Châu Gia Bảo
   * @created_at 10/03/2023
   * @descriptionKey API GET ALL BOOK
   */
  GET_ALL_BOOK_STUDENT: '/student/v1/user/book/all',

  /**
   * @author Châu Gia Bảo
   * @created_at 10/03/2023
   * @descriptionKey API GET DETAIL BOOK
   */
  GET_DETAIL_BOOK_STUDENT: '/student/v1/user/book/detail',

  /**
   * @author Châu Gia Bảo
   * @created_at 10/03/2023
   * @descriptionKey API GET BORROW BOOK
   */
  BORROW_BOOK_STUDENT: '/student/v1/user/private/borrow_book/borrow',

  /**
   * @author Châu Gia Bảo
   * @created_at 10/03/2023
   * @descriptionKey API GET ALL BOOK
   */
  EMAIL_FORGET_PASSWORD: '/student/v1/user/forget-password',

  /**
   * @author Châu Gia Bảo
   * @created_at 10/03/2023
   * @descriptionKey API GET ALL BOOK
   */
  RESET_FORGET_PASSWORD: '/student/v1/user/reset',

  /**
   * @author Châu Gia Bảo
   * @created_at 22/03/2023
   * @descriptionKey API GET ALL BOOK
   */
  GET_ALL_BORROWED_BOOK: '/student/v1/user/reset',
};
export default API_STUDENT;
