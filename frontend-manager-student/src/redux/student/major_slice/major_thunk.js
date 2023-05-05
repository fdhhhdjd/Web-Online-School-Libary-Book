//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! API STUDENT
import API_USER from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';
import REQUEST from 'utils/request';
import CONSTANTS from 'configs/constants';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 22/03/2023
 * @descriptionKey Call api Get All Major student
 * @function Get_All_Major_Initial
 * @return {Object}
 */
export const Get_All_Major_Initial = createAsyncThunk('customer/major/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${API_USER.GET_ALL_MAJOR}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: CONSTANTS.DELETED_ENABLE,
    });

    //Take response Success
    const successData = response.data;

    //Check data
    if (successData) {
      // return result data
      return successData;
    }
  } catch (error) {
    if (error) {
      //Take response Error
      const errorData = error.response.data;

      // return error
      return rejectWithValue(errorData);
    }
  }
});
