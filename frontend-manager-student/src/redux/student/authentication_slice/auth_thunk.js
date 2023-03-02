//! LIBRARY
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

//! NOTIFICATION
import NOTIFICATION from 'utils/notification';

//! API STUDENT
import API_STUDENT from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';
import { setToken } from 'utils/auth';

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

    //Check data
    if (successData) {
      const success_general = {
        message: successData?.element?.result || successData.message,
        status: successData.status,
        access_token: successData?.element?.result?.access_token,
      };

      // Save LocalStorage
      setToken(success_general.access_token);

      // Notification Success
      NOTIFICATION.notifySuccess('Login Student Success' || successData.message);

      // return result data
      return successData;
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
