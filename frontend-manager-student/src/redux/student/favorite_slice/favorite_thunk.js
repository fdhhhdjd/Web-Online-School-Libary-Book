//! LIBRARY
import { createAsyncThunk } from '@reduxjs/toolkit';

//! NOTIFICATION

//! API STUDENT
import USER_API from 'api/api_user';
import CONSTANTS from 'configs/constants';

//! SHARE
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';
import REQUEST from 'utils/request';

/**
 * @author Nguyễn Tiến Tài
 * @created_at 05/04/2023
 * @descriptionKey Call api add favorite admin cms
 * @function Add_Favorite_Cms_Initial
 * @return {Object}
 */
export const Add_Favorite_Initial = createAsyncThunk(
  'admin/cms/favorite/add',
  async ({ book_id }, { rejectWithValue }) => {
    try {
      //Call Api axios
      const response = await REQUEST.post(
        `${USER_API.ADD_FAVORITE}`,
        {
          input: {
            favorite_input: {
              book_id,
            },
          },
        },
        {
          headers: HELPERS.headerBrowser(),
          withCredentials: true,
        },
      );

      //Take response Success
      const successData = response.data;

      //Check data
      if (successData) {
        // return result data
        NOTIFICATION.swalSuccess('Đã thêm vào danh sách yêu thích', '');
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
 * @author Nguyễn Tiến Tài
 * @created_at 22/03/2023
 * @descriptionKey Call api Get All Borrowed Book student
 * @function Get_All_Borrowed_Book_Initial
 * @return {Object}
 */
export const Get_All_Favorite_Initial = createAsyncThunk('customer/favorite/all', async (_, { rejectWithValue }) => {
  try {
    //Call Api axios
    const response = await REQUEST.get(`${USER_API.GET_FAVORITE}`, {
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
