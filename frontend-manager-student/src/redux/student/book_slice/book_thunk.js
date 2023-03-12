//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//! NOTIFICATION

//! API STUDENT
import API_USER from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';

/**
 * @author Châu Gia Bảo
 * @created_at 10/03/2023
 * @descriptionKey Call api Get All Book student
 * @function Get_All_Book_Student_Initial
 * @return {Object}
 */
export const Get_All_Book_Student_Initial = createAsyncThunk('customer/book/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await axios.get(`${API_USER.GET_ALL_BOOK_STUDENT}`, {
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

/**
 * @author Châu Gia Bảo
 * @created_at 10/03/2023
 * @descriptionKey Call api Get All Book student
 * @function Get_All_Book_Student_Initial
 * @return {Object}
 */
export const Get_Detail_Book_Student_Initial = createAsyncThunk(
  'customer/book/detail',
  async ({ id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await axios.get(`${API_USER.GET_DETAIL_BOOK_STUDENT}/${id}`, {
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
  },
);
