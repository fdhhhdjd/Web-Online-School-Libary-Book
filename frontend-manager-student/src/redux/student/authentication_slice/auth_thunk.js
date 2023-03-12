//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! NOTIFICATION
import NOTIFICATION from 'utils/notification';

//! API STUDENT
import API_STUDENT from 'api/api_user';

//! SHARE
import CONSTANTS from 'configs/constants';
import TEXT_NOTIFICATION from 'configs/text_notification';
import { setToken } from 'utils/auth';
import HELPERS from 'utils/helper';

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
    const response = await axios.post(
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
    console.log(successData, 'login');

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
    const response = await axios.get(`${API_STUDENT.PROFILE_STUDENT}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: true,
    });

    //Take response Success
    const successData = response.data;
    console.log(successData, 'ạhdasjdhsd');

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
 * @created_at 06/03/2023
 * @descriptionKey Call api Profile Student
 * @function Logout_Student_Initial
 * @return {Object}
 */
export const Logout_Student_Initial = createAsyncThunk('student/logout', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await axios.post(`${API_STUDENT.LOGOUT_STUDENT}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: true,
    });

    //Take response Success
    const successData = response.data;

    //Check data
    if (successData) {
      // return result data
      const result_data = HELPERS.takeDataResponse(successData);

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
    const response = await axios.get(`${API_STUDENT.RE_NEW_TOKEN_STUDENT}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: true,
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
