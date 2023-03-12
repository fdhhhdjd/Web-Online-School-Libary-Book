//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! NOTIFICATION

//! API STUDENT
import API_ADMIN from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 09/03/2023
 * @descriptionKey Call api Get All Book admin cms
 * @function Get_All_Book_Cms_Initial
 * @return {Object}
 */
export const Get_All_Book_Cms_Initial = createAsyncThunk('admin/cms/book/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await axios.get(`${API_ADMIN.GET_ALL_BOOK_CMS}`, {
      headers: HELPERS.headerBrowser(),
      withCredentials: true,
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
