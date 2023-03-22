//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! API STUDENT
import API_USER from 'api/api_user';

//! SHARE
import HELPERS from 'utils/helper';
import REQUEST from 'utils/request';
import CONSTANTS from 'configs/constants';

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
    const response = await REQUEST.get(`${API_USER.GET_ALL_BOOK_STUDENT}`, {
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
      const response = await REQUEST.get(`${API_USER.GET_DETAIL_BOOK_STUDENT}/${id}`, {
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
  },
);

/**
 * @author Châu Gia Bảo
 * @created_at 144/03/2023
 * @descriptionKey Call api Get All Book student
 * @function Get_All_Book_Student_Initial
 * @return {Object}
 */
export const Borrow_Book_Student_Initial = createAsyncThunk(
  'customer/book/borrow',
  async ({ book_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${API_USER.BORROW_BOOK_STUDENT}`,
        {
          input: {
            borrow_book_input: {
              book_id,
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
