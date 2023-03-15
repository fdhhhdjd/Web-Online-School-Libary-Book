//! LIBRARY
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

//! NOTIFICATION
import NOTIFICATION from 'utils/notification';

//! API STUDENT
import API_ADMIN from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';
import CONSTANTS from 'configs/constants';
import { setToken } from 'utils/auth';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 02/03/2023
 * @descriptionKey Call api Login admin cms
 * @function Login_mssv_Initial
 * @return {Object}
 */
export const Login_Cms_Initial = createAsyncThunk('admin/cms/mssv', async ({ mssv, password }, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await axios.post(
      `${API_ADMIN.LOGIN_ADMIN_CMS}`,
      {
        input: {
          admin_login_input: {
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
      setToken(CONSTANTS.AUTH_TOKEN, success_general.access_token);

      // Notification Success
      NOTIFICATION.notifySuccess('Login Cms Success' || successData.message);

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

/**
 * @author Nguyễn Tiến Tài
 * @created_at 14/03/2023
 * @descriptionKey Call api renew token Student
 * @function Renew_Token_Student_Initial
 * @return {Object}
 */
export const Renew_Token_Cms_Initial = createAsyncThunk('student/new/token', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await axios.get(`${API_ADMIN.RENEW_TOKEN_CMS}`, {
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
