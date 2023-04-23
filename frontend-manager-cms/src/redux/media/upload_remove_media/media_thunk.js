//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! NOTIFICATION
import NOTIFICATION from 'utils/notification';

//! API STUDENT
import API_MEDIA from 'api/api_media';

//! SHARE
import HELPERS from 'utils/helper';
import REQUEST from 'utils/request';
import CONSTANTS from 'configs/constants';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 15/03/2023
 * @descriptionKey Upload Media
 * @function Upload_Media_Initial
 * @return {Object}
 */
export const Upload_Media_Initial = createAsyncThunk('media/upload', async ({ formData }, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.post(`${API_MEDIA.UPLOAD_MEDIA}`, formData, {
      headers: HELPERS.headerBrowserMedia(),
      withCredentials: CONSTANTS.DELETED_ENABLE,
    });

    //Take response Success
    const successData = response?.data;

    // return result data
    return successData;
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
 * @created_at 26/03/2023
 * @descriptionKey Destroy Media
 * @function Destroy_Media_Initial
 * @return {Object}
 */
export const Destroy_Media_Initial = createAsyncThunk('media/destroy', async ({ public_id }, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.post(
      `${API_MEDIA.REMOVE_MEDIA}`,
      {
        input: {
          remove_public_id: {
            public_id,
          },
        },
      },
      {
        headers: HELPERS.headerBrowser(),
        withCredentials: CONSTANTS.DELETED_ENABLE,
      },
    );

    //Take response Success
    const successData = response?.data;

    // return result data
    return successData;
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
