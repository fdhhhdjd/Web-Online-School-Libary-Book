//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! NOTIFICATION
import NOTIFICATION from 'utils/notification';

//! API STUDENT
import API_STUDENT from 'api/api_user';

//! SHARE
import CONSTANTS from 'configs/constants';
import TEXT_NOTIFICATION from 'configs/text_notification';
import HELPERS from 'utils/helper';
import REQUEST from 'utils/request';
import { setToken, clearToken } from 'utils/auth';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 02/03/2023
 * @descriptionKey Call api Login Student
 * @function Login_mssv_Initial
 * @return {Object}
 */
export const Login_Mssv_Initial = createAsyncThunk('student/mssv', async ({ mssv, password }, { rejectWithValue }) => {
  try {
    //Call Api axios

    const response = await REQUEST.post(
      `${API_STUDENT.LOGIN_STUDENT}`,
      {
        input: {
          user_login_input: {
            mssv,
            password,
          },
        },
      },
      {
        headers: HELPERS.headerBrowser(),
      },
    );

    //Take response Success
    const successData = response.data;

    //Check data
    if (successData) {
      // return result data
      const result_data = HELPERS.takeDataResponse(successData);

      // Save LocalStorage
      setToken(CONSTANTS.AUTH_TOKEN, result_data?.data?.access_token);

      // Notification Success
      NOTIFICATION.notifySuccess(TEXT_NOTIFICATION.NOTIFICATION_LOGIN_SUCCESS || result_data.message);

      // return result data
      return result_data;
    }
  } catch (error) {
    if (error) {
      //Take response Error
      const errorData = error.response.data;

      // return result data
      const result_data = HELPERS.takeDataResponse(errorData);

      if (errorData) {
        // Notification Error
        NOTIFICATION.notifyError(result_data.data || result_data.message);
      }

      // return error
      return rejectWithValue(result_data);
    }
  }
});

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/03/2023
 * @descriptionKey Call api Profile Student
 * @function Profile_Student_Initial
 * @return {Object}
 */
export const Profile_Student_Initial = createAsyncThunk('student/profile', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_STUDENT.PROFILE_STUDENT}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: CONSTANTS.DELETED_ENABLE,
    });

    //Take response Success
    const successData = response.data;

    //Check data
    if (successData) {
      // return result data
      const result_data = HELPERS.takeDataResponse(successData);
      return result_data;
    }
  } catch (error) {
    if (error) {
      //Take response Error
      const errorData = error.response.data;

      if (errorData) {
        const error_general = {
          message: errorData?.element?.result || errorData.message,
          status: errorData.status,
        };

        // Notification Error
        NOTIFICATION.notifyError(error_general.message);
      }

      // return error
      return rejectWithValue(errorData);
    }
  }
});

/**
 * @author Châu Gia Bảo
 * @created_at 15/03/2023
 * @descriptionKey Call api Profile Student
 * @function Send_Mail_ForgetPass_Student_Initial
 * @return {Object}
 */
export const Send_Mail_Student_Initial = createAsyncThunk(
  'student/mail/forget',
  async ({ email }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_STUDENT.EMAIL_FORGET_PASSWORD}`,
        {
          input: {
            user_forget_password_input: {
              email,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
          withCredentials: CONSTANTS.DELETED_ENABLE,
        },
      );

      //Take response Success
      const successData = response.data;

      //Check data
      if (successData) {
        // return result data
        const result_data = HELPERS.takeDataResponse(successData);
        return result_data;
      }
    } catch (error) {
      if (error) {
        //Take response Error
        const errorData = error.response.data;

        // return error
        return rejectWithValue(errorData);
      }
    }
  },
);

/**
 * @author Châu Gia Bảo
 * @created_at 06/03/2023
 * @descriptionKey Call api Logout Student
 * @function Logout_Student_Initial
 * @return {Object}
 */
export const Logout_Student_Initial = createAsyncThunk('student/logout', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_STUDENT.LOGOUT_STUDENT}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: CONSTANTS.DELETED_ENABLE,
    });

    //Take response Success
    const successData = response.data;

    //Check data
    if (successData) {
      // return result data
      const result_data = HELPERS.takeDataResponse(successData);

      // Clear LocalStorage
      clearToken(CONSTANTS.AUTH_TOKEN);

      // notify success
      NOTIFICATION.notifySuccess(TEXT_NOTIFICATION.NOTIFICATION_LOGOUT_SUCCESS);

      return result_data;
    }
  } catch (error) {
    if (error) {
      //Take response Error
      const errorData = error.response.data;

      if (errorData) {
        const error_general = {
          message: errorData?.element?.result || errorData.message,
          status: errorData.status,
        };

        // Notification Error
        NOTIFICATION.notifyError(error_general.message);
      }

      // return error
      return rejectWithValue(errorData);
    }
  }
});

/**
 * @author Nguyễn Tiến Tài
 * @created_at 03/03/2023
 * @descriptionKey Call api renew token Student
 * @function Renew_Token_Student_Initial
 * @return {Object}
 */
export const Renew_Token_Student_Initial = createAsyncThunk('student/new/token', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_STUDENT.RE_NEW_TOKEN_STUDENT}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: CONSTANTS.DELETED_ENABLE,
    });

    //Take response Success
    const successData = response.data;

    //Check data
    if (successData) {
      // return result data
      const result_data = HELPERS.takeDataResponse(successData);

      // Save LocalStorage
      setToken(CONSTANTS.AUTH_TOKEN, result_data.data.access_token);

      return result_data;
    }
  } catch (error) {
    if (error) {
      //Take response Error
      const errorData = error.response.data;

      if (errorData) {
        const error_general = {
          message: errorData?.element?.result || errorData.message,
          status: errorData.status,
        };

        // Notification Error
        NOTIFICATION.notifyError(error_general.message);
      }

      // return error
      return rejectWithValue(errorData);
    }
  }
});

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/03/2023
 * @descriptionKey Call api Change Password Student
 * @function Change_Password_Initial
 * @return {Object}
 */
export const Change_Password_Initial = createAsyncThunk(
  'student/changePassword',
  async ({ oldPassword, password, confirmPassword }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_STUDENT.CHANGE_PASSWORD_STUDENT}`,
        {
          input: {
            user_change_password_input: {
              oldPassword,
              password,
              confirmPassword,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
        },
      );

      //Take response Success
      const successData = response.data;

      //Check data
      if (successData) {
        // return result data
        const result_data = HELPERS.takeDataResponse(successData);

        // Clear LocalStorage
        clearToken(CONSTANTS.AUTH_TOKEN);

        // Notification Success
        NOTIFICATION.notifySuccess(TEXT_NOTIFICATION.NOTIFICATION_CHANGE_PASSWORD_SUCCESS || result_data.message);

        // Notification login session expire
        setTimeout(() => {
          NOTIFICATION.swalLoginSessionExpired(
            TEXT_NOTIFICATION.NOTIFICATION_LOGIN_SESSION_EXPIRE || result_data.message,
          );
        }, CONSTANTS._2_SECOND);

        // return result data
        return result_data;
      }
    } catch (error) {
      if (error) {
        //Take response Error
        const errorData = error.response.data;

        // return result data
        const result_data = HELPERS.takeDataResponse(errorData);

        if (errorData) {
          // Notification Error
          NOTIFICATION.notifyError(result_data.data || result_data.message);
        }

        // return error
        return rejectWithValue(result_data);
      }
    }
  },
);

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/03/2023
 * @descriptionKey Call api Forget Password Student
 * @function Forget_Password_Initial
 * @return {Object}
 */
export const Forget_Password_Initial = createAsyncThunk(
  'student/forgetPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_STUDENT.FORGET_PASSWORD_STUDENT}`,
        {
          input: {
            user_forget_password_input: {
              email,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
        },
      );

      //Take response Success
      const successData = response.data;

      //Check data
      if (successData) {
        // return result data
        const result_data = HELPERS.takeDataResponse(successData);

        const message = HELPERS.getURIFromTemplate(TEXT_NOTIFICATION.NOTIFICATION_FORGET_PASSWORD_SUCCESS, {
          email,
        });
        // Notification Success
        NOTIFICATION.swalSuccess(TEXT_NOTIFICATION.NOTIFICATION_SEND_MAIL_SUCCESS, message || result_data.message);

        // return result data
        return result_data;
      }
    } catch (error) {
      if (error) {
        //Take response Error
        const errorData = error.response.data;

        // return result data
        const result_data = HELPERS.takeDataResponse(errorData);

        if (errorData) {
          // Notification Error
          NOTIFICATION.notifyError(result_data.data || result_data.message);
        }

        // return error
        return rejectWithValue(result_data);
      }
    }
  },
);

/**
 * @author Gia Bao
 * @created_at 16/03/2023
 * @descriptionKey Call api Reset Password Student
 * @function Reset_Password_Initial
 * @return {Object}
 */
export const Reset_Password_Initial = createAsyncThunk(
  'student/resetPassword',
  async ({ id, password, confirmPassword, e }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_STUDENT.RESET_FORGET_PASSWORD}/${id}`,
        {
          input: {
            user_reset_password_input: {
              password,
              confirmPassword,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
        },
      );

      //Take response Success
      const successData = response.data;

      //Check data
      if (successData) {
        // return result data
        const result_data = HELPERS.takeDataResponse(successData);

        // Info reset success
        NOTIFICATION.swalSuccess(
          TEXT_NOTIFICATION.NOTIFICATION_RESET.PASSWORD_SUCCESS_TITLE,
          TEXT_NOTIFICATION.NOTIFICATION_RESET.PASSWORD_SUCCESS_TEXT,
        );

        //Del input
        HELPERS.delInputSuccess(e);

        // return result data
        return result_data;
      }
    } catch (error) {
      if (error) {
        //Take response Error
        const errorData = error.response.data;

        // return result data
        const result_data = HELPERS.takeDataResponse(errorData);

        if (errorData) {
          // Notification Error
          NOTIFICATION.notifyError(result_data.data || result_data.message);
        }

        // return error
        return rejectWithValue(result_data);
      }
    }
  },
);
