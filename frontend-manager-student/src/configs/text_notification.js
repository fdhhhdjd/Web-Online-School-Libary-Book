const TEXT_NOTIFICATION = {
  /**
   * @author Nguyễn Tiến Tài,Châu Gia Bảo
   * @created_at 04/03/2023
   * @updated_at 15/03/2023,16/03/2023
   * @description Text title web
   */
  NOTIFICATION_LOGIN_SUCCESS: 'Đăng nhập thành công',

  NOTIFICATION_LOGOUT_SUCCESS: 'Đăng xuất thành công',

  NOTIFICATION_CHANGE_PASSWORD_SUCCESS: 'Đổi mật khẩu thành công',

  NOTIFICATION_SEND_MAIL_SUCCESS: 'Gửi mail thành công',

  NOTIFICATION_RESET: {
    PASSWORD_SUCCESS_TITLE: 'Reset password thành công',
    PASSWORD_SUCCESS_TEXT: 'Hãy quay về trang chủ để đăng nhập',
  },

  NOTIFICATION_FORGET_PASSWORD_SUCCESS:
    'Đã gửi link reset password đến ${email}. Vui lòng vào email của bạn để tiếp tục',
  NOTIFICATION_LOGIN_SESSION_EXPIRE: 'Phiên đăng nhập của bạn đã hết hạn',
  /**
   * @author Nguyễn Tiến Tài,Châu Gia Bảo
   * @created_at 19/03/2023
   * @description Text input
   */
  NOTIFICATION_INPUT_INVALID: {
    _EMAIL: 'Email Không được bỏ trống !!!',
    _PHONE: 'Phone Không được bỏ trống !!!',
    _FULL_NAME: 'Full Name Không được bỏ trống !!!',
    _MSSV: 'MSSV Không được bỏ trống !!!',
  },
};
export default TEXT_NOTIFICATION;
